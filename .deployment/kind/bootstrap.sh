#!/usr/bin/env bash
# bootstrap.sh — spin up local-dev kind cluster with Cilium, Envoy Gateway,
#                cert-manager (self-signed), and metrics-server
set -euo pipefail

CLUSTER_NAME="local-dev"
CILIUM_VERSION="1.16.5"
ENVOY_GATEWAY_VERSION="1.3.0"
CERT_MANAGER_VERSION="1.16.3"
METRICS_SERVER_VERSION="3.12.2"
GATEWAY_API_VERSION="1.2.1"

# ── Colours ───────────────────────────────────────────────────────────────────
GREEN='\033[0;32m'; YELLOW='\033[1;33m'; NC='\033[0m'
info()  { echo -e "${GREEN}▶ $*${NC}"; }
warn()  { echo -e "${YELLOW}⚠ $*${NC}"; }

# ── Preflight ─────────────────────────────────────────────────────────────────
for bin in kind kubectl helm cilium; do
  command -v "$bin" &>/dev/null || { echo "Missing: $bin"; exit 1; }
done

# ── Cluster ───────────────────────────────────────────────────────────────────
info "Creating kind cluster '${CLUSTER_NAME}' (k8s 1.35.1)..."
kind create cluster --config kind-config.yaml --wait 120s

info "Setting kubectl context..."
kubectl cluster-info --context "kind-${CLUSTER_NAME}"

# ── Gateway API CRDs (must precede both Cilium and Envoy Gateway) ──────────────
info "Installing Gateway API CRDs v${GATEWAY_API_VERSION}..."
kubectl apply -f "https://github.com/kubernetes-sigs/gateway-api/releases/download/v${GATEWAY_API_VERSION}/experimental-install.yaml"

# ── Cilium ────────────────────────────────────────────────────────────────────
info "Installing Cilium v${CILIUM_VERSION}..."
helm repo add cilium https://helm.cilium.io/ --force-update
helm repo update cilium

helm upgrade --install cilium cilium/cilium \
  --version "${CILIUM_VERSION}" \
  --namespace kube-system \
  --set kubeProxyReplacement=true \
  --set k8sServiceHost="$(kubectl get nodes -o jsonpath='{.items[0].status.addresses[?(@.type=="InternalIP")].address}')" \
  --set k8sServicePort=6443 \
  --set bpf.masquerade=true \
  --set routingMode=native \
  --set ipv4NativeRoutingCIDR="10.244.0.0/16" \
  --set autoDirectNodeRoutes=true \
  --set ipam.mode=kubernetes \
  \
  `# Gateway API integration` \
  --set gatewayAPI.enabled=true \
  --set gatewayAPI.secretsNamespace.create=true \
  \
  `# kube-proxy replacement` \
  --set socketLB.enabled=true \
  --set nodePort.enabled=true \
  --set externalIPs.enabled=true \
  --set hostPort.enabled=true \
  \
  `# Hubble — eBPF observability, zero extra infra` \
  --set hubble.enabled=true \
  --set hubble.relay.enabled=true \
  --set hubble.ui.enabled=true \
  --set hubble.metrics.enableOpenMetrics=true \
  --set hubble.metrics.enabled="{dns,drop,tcp,flow,port-distribution,icmp,httpV2:exemplars=true;labelsContext=source_ip\,source_namespace\,source_workload\,destination_ip\,destination_namespace\,destination_workload\,traffic_direction}" \
  \
  `# HTTP/3 / QUIC readiness in Cilium's L7 proxy` \
  --set envoy.enabled=true \
  --set envoy.securityContext.capabilities.keepCapNetBindService=true \
  \
  `# Low footprint` \
  --set operator.replicas=1 \
  --set resources.requests.cpu="100m" \
  --set resources.requests.memory="256Mi" \
  --wait --timeout 300s

info "Waiting for Cilium to be ready..."
cilium status --wait --wait-duration 120s

# ── Envoy Gateway ─────────────────────────────────────────────────────────────
info "Installing Envoy Gateway v${ENVOY_GATEWAY_VERSION}..."
helm repo add envoy-gateway https://charts.envoyproxy.io --force-update
helm repo update envoy-gateway

helm upgrade --install envoy-gateway envoy-gateway/gateway-helm \
  --version "${ENVOY_GATEWAY_VERSION}" \
  --namespace envoy-gateway-system \
  --create-namespace \
  --set config.envoyGateway.logging.level.default=warn \
  --wait --timeout 120s

# Provision a GatewayClass backed by Envoy Gateway
kubectl apply -f - <<'EOF'
apiVersion: gateway.networking.k8s.io/v1
kind: GatewayClass
metadata:
  name: envoy
spec:
  controllerName: gateway.envoyproxy.io/gatewayclass-controller
EOF

# Create the local Gateway with HTTP, HTTPS, and HTTP/3 listeners
# NodePort services are created below to expose ports 30080/30443 on the host.
kubectl apply -f - <<'EOF'
apiVersion: gateway.networking.k8s.io/v1
kind: Gateway
metadata:
  name: local-gateway
  namespace: envoy-gateway-system
  annotations:
    # Signal downstream support for HTTP/3 via alt-svc
    envoy-gateway.io/http3-enabled: "true"
spec:
  gatewayClassName: envoy
  listeners:
    - name: http
      protocol: HTTP
      port: 80
      allowedRoutes:
        namespaces:
          from: All
    - name: https
      protocol: HTTPS
      port: 443
      tls:
        mode: Terminate
        certificateRefs:
          - name: wildcard-local-test-tls
            namespace: envoy-gateway-system
      allowedRoutes:
        namespaces:
          from: All
EOF

# EnvoyPatchPolicy — enable HTTP/3 (QUIC) on the HTTPS listener
# This patches the xDS Listener to add a QUIC transport socket.
kubectl apply -f - <<'EOF'
apiVersion: gateway.envoyproxy.io/v1alpha1
kind: EnvoyPatchPolicy
metadata:
  name: enable-http3
  namespace: envoy-gateway-system
spec:
  targetRef:
    group: gateway.networking.k8s.io
    kind: Gateway
    name: local-gateway
    namespace: envoy-gateway-system
  type: JSONPatch
  jsonPatches:
    - type: "type.googleapis.com/envoy.config.listener.v3.Listener"
      name: "envoy-gateway-system/local-gateway/https"
      operation:
        op: add
        path: "/udp_listener_config"
        value:
          downstream_socket_config: {}
          quic_options: {}
EOF

# NodePort service to bind host ports 80/443 to the Envoy Gateway pods
# (kind exposes containerPorts 30080/30443 → hostPorts 80/443)
kubectl apply -f - <<'EOF'
apiVersion: v1
kind: Service
metadata:
  name: envoy-nodeport
  namespace: envoy-gateway-system
spec:
  type: NodePort
  selector:
    gateway.envoyproxy.io/owning-gateway-name: local-gateway
    gateway.envoyproxy.io/owning-gateway-namespace: envoy-gateway-system
  ports:
    - name: http
      port: 80
      targetPort: 10080
      nodePort: 30080
      protocol: TCP
    - name: https
      port: 443
      targetPort: 10443
      nodePort: 30443
      protocol: TCP
    - name: https-udp
      port: 443
      targetPort: 10443
      nodePort: 30443
      protocol: UDP
EOF

# ── cert-manager ──────────────────────────────────────────────────────────────
info "Installing cert-manager v${CERT_MANAGER_VERSION}..."
helm repo add jetstack https://charts.jetstack.io --force-update
helm repo update jetstack

helm upgrade --install cert-manager jetstack/cert-manager \
  --version "${CERT_MANAGER_VERSION}" \
  --namespace cert-manager \
  --create-namespace \
  --set crds.enabled=true \
  --set replicaCount=1 \
  --set webhook.replicaCount=1 \
  --set cainjector.replicaCount=1 \
  --wait --timeout 120s

# Self-signed ClusterIssuer → local CA → wildcard cert for *.local.test
# No real domain required. Trust the CA cert in your OS/browser.
kubectl apply -f - <<'EOF'
---
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: selfsigned-root
spec:
  selfSigned: {}
---
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: local-ca
  namespace: cert-manager
spec:
  isCA: true
  commonName: local-dev-ca
  secretName: local-ca-tls
  privateKey:
    algorithm: ECDSA
    size: 256
  issuerRef:
    name: selfsigned-root
    kind: ClusterIssuer
    group: cert-manager.io
---
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: local-ca-issuer
spec:
  ca:
    secretName: local-ca-tls
---
# Wildcard cert for *.local.test — works for any subdomain locally
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: wildcard-local-test-tls
  namespace: envoy-gateway-system
spec:
  secretName: wildcard-local-test-tls
  issuerRef:
    name: local-ca-issuer
    kind: ClusterIssuer
  commonName: "*.local.test"
  dnsNames:
    - "local.test"
    - "*.local.test"
  duration: 8760h   # 1 year
  renewBefore: 720h
EOF

info "Waiting for wildcard cert to be issued..."
kubectl wait --for=condition=Ready certificate/wildcard-local-test-tls \
  -n envoy-gateway-system --timeout=60s

# ── metrics-server ────────────────────────────────────────────────────────────
info "Installing metrics-server v${METRICS_SERVER_VERSION}..."
helm repo add metrics-server https://kubernetes-sigs.github.io/metrics-server/ --force-update
helm repo update metrics-server

helm upgrade --install metrics-server metrics-server/metrics-server \
  --version "${METRICS_SERVER_VERSION}" \
  --namespace kube-system \
  --set args="{--kubelet-insecure-tls}" \
  --set replicas=1 \
  --wait --timeout 60s

# ── Final status ──────────────────────────────────────────────────────────────
info "Cluster is ready!"
echo ""
echo "  Hubble UI:       kubectl port-forward -n kube-system svc/hubble-ui 12000:80"
echo "  cilium status:   cilium status"
echo "  kubectl top:     kubectl top nodes"
echo ""
warn "HTTP/3: UDP port 443 is wired. QUIC support depends on your Docker/OS network stack."
warn "Local TLS: extract & trust the CA cert with:"
echo "  kubectl get secret local-ca-tls -n cert-manager -o jsonpath='{.data.tls\.crt}' | base64 -d > local-ca.crt"
echo "  # macOS: sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain local-ca.crt"
echo "  # Linux: sudo cp local-ca.crt /usr/local/share/ca-certificates/ && sudo update-ca-certificates"
echo ""
warn "DNS: add entries to /etc/hosts or use dnsmasq to route *.local.test → 127.0.0.1"
echo "  echo '127.0.0.1 app.local.test' | sudo tee -a /etc/hosts"
