#!/usr/bin/env bash
# teardown.sh — destroy the local-dev kind cluster and clean up helm repos
set -euo pipefail

CLUSTER_NAME="local-dev"

echo "Deleting kind cluster '${CLUSTER_NAME}'..."
kind delete cluster --name "${CLUSTER_NAME}"

echo "Removing helm repos (optional)..."
for repo in cilium envoy-gateway jetstack metrics-server; do
  helm repo remove "$repo" 2>/dev/null || true
done

echo "Done. Cluster '${CLUSTER_NAME}' removed."
