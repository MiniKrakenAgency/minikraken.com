// Src/hooks.server.ts
import { OTEL_DATASET, OTEL_ENDPOINT, OTEL_KEY } from '$env/static/private'
import { NodeSDK } from '@opentelemetry/sdk-node'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto'
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base'
import { resourceFromAttributes } from '@opentelemetry/resources'
import { ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION } from '@opentelemetry/semantic-conventions'
import { ATTR_DEPLOYMENT_ENVIRONMENT_NAME } from '@opentelemetry/semantic-conventions/incubating'
import { dev } from '$app/environment'
import { version } from '../package.json'
import { UndiciInstrumentation } from '@opentelemetry/instrumentation-undici'
import { createAddHookMessageChannel } from 'import-in-the-middle'
import { register } from 'node:module'

const { registerOptions } = createAddHookMessageChannel()
register('import-in-the-middle/hook.mjs', import.meta.url, registerOptions)

const sdk = new NodeSDK({
	instrumentations: [
		new UndiciInstrumentation({
			/*IgnoreRequestHook: (request) => {
				const url = request.path ?? ''
				return url.startsWith('/_app') || url === '/favicon.ico'
			}*/
		})
	],
	resource: resourceFromAttributes({
		[ATTR_SERVICE_NAME]: 'minikraken-dot-com',
		[ATTR_SERVICE_VERSION]: version,
		[ATTR_DEPLOYMENT_ENVIRONMENT_NAME]: dev ? 'development' : 'production'
	}),
	resourceDetectors: [],
	spanProcessors: [
		new BatchSpanProcessor(
			new OTLPTraceExporter({
				headers: {
					Authorization: `Bearer ${OTEL_KEY}`,
					'X-Axiom-Dataset': OTEL_DATASET
				},
				url: OTEL_ENDPOINT
			})
		)
	]
})

sdk.start()

process.on('sveltekit:shutdown', () => {
	// eslint-disable-next-line unicorn/prefer-await
	sdk.shutdown().catch(console.error)
})
