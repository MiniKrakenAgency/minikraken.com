import { Elysia } from 'elysia'

type RequestHandler = (v: { request: Request }) => Response | Promise<Response>

//Todo: add opentelemetry to this. also check out if we can wrap the current instrumentation into elysia's way of doing it

const app = new Elysia({ prefix: '/api' })
	.get('/healthz', () => "I'm here")
	.all('/*', ({ status }) => status(404, { message: 'Not Found' }))

export const fallback: RequestHandler = async ({ request }) => app.handle(request)
