import { Resend } from '$lib/mailing/resend'
import * as contactToClient from '$lib/mailing/templates/contactToClient'
import * as contactToMiniKraken from '$lib/mailing/templates/contactToMiniKraken'

export interface MailProperties {
	client: {
		email: string
		name: string
		message: string
		subject: string
	}
}

export const sendContactEmail = async ({ client }: MailProperties) => {
	const [toClient, toUs] = await Promise.allSettled([
		Resend.emails.send({
			from: 'Maxime van MiniKraken <contact@minikraken.com>',
			html: contactToClient.template({
				messageContent: client.message,
				messageSubject: client.subject,
				senderName: client.name
			}),
			subject: 'Laten we van start gaan!',
			to: [client.email]
		}),
		Resend.emails.send({
			from: 'MiniKraken Contact Form <contact@minikraken.com>',
			html: contactToMiniKraken.template({
				email: client.email,
				message: client.message,
				name: client.name,
				subject: client.subject
			}),
			subject: `[Contact] ${client.subject}`,
			to: ['contact@minikraken.com']
		})
	])

	if (toClient.status === 'rejected') {
		console.error('Failed to send client email:', toClient.reason)
	}
	if (toUs.status === 'rejected') {
		console.error('Failed to send internal email:', toUs.reason)
	}
}
