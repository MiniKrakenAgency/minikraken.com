import { Resend } from '$lib/mailing/resend'

export interface MailProperties {
	client: {
		email: string
		name: string
		message: string
		subject: string
	}
}

export const newMailSubscription = async ({ client: { email } }: MailProperties) => {
	const { data, error } = await Resend.contacts.create({
		audienceId: 'a844d1b1-40ae-474a-9042-3a56d50f1329',
		email,
		unsubscribed: false
	})

	if (error) {
		console.error({ error })
		return
	}

	console.log({ data })
}
