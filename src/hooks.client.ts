import type { HandleClientError } from '@sveltejs/kit'
/*Import posthog from 'posthog-js'

posthog.init('<posthog-key>', {
	api_host: 'https://eu.i.posthog.com',
	person_profiles: 'always', // or 'always' to create profiles for anonymous users as well,
	disable_session_recording: true
})

posthog.capture('page-loaded', { property: 'value' })*/

//Export const init: ClientInit = () => {}

export const handleError: HandleClientError = async ({ message }) => {
	const errorId = crypto.randomUUID()

	return {
		errorId,
		message: message ?? 'Whoops!'
	}
}
