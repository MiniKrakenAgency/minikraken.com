import { command } from '$app/server'
import { invalid } from '@sveltejs/kit'
import {
	ContactFormSchema,
	contactFormMaxSubmitMS,
	contactFormMinSubmitLimit
} from '$lib/forms/contact'
import { sendContactEmail } from '$lib/mailing/sendEmail'

export const sendContact = command(ContactFormSchema, async (data) => {
	if (data.company !== '') {
		invalid('Er ging iets mis. Probeer het later opnieuw.')
	}

	const elapsedMs = Date.now() - data.startedAt

	if (elapsedMs < contactFormMinSubmitLimit) {
		invalid('Er ging iets mis. Probeer het later opnieuw.')
	}

	if (elapsedMs > contactFormMaxSubmitMS) {
		invalid('Dit formulier is verlopen. Herlaad de pagina en probeer opnieuw.')
	}

	await sendContactEmail({
		client: {
			email: data.email,
			message: data.message,
			name: data.name,
			subject: data.subject
		}
	})
})
