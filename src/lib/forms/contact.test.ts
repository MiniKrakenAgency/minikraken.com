import {
	contactFormMaxSubmitMS,
	contactFormMinSubmitLimit,
	readContactFormInput,
	validateContactFormData,
	validateContactFormInput
} from './contact'

const NOW = 1_700_000_000_000,
	validInput = {
		company: '',
		email: '  ADA@EXAMPLE.COM  ',
		message: '  Hallo, ik wil graag veilig contact opnemen.  ',
		name: '  Ada Lovelace  ',
		startedAt: String(NOW - contactFormMinSubmitLimit - 1),
		subject: '  Vraag over beveiliging  '
	}

describe('contact form validation', () => {
	it('valid input succeeds and normalizes submitted fields', () => {
		const result = validateContactFormInput(validInput, NOW)

		expect(result.success).toBeTruthy()
		if (!result.success) {
			throw new Error('Expected contact form validation to succeed')
		}
		expect(result.values).toStrictEqual(validInput)
		expect(result.data).toStrictEqual({
			company: '',
			email: 'ada@example.com',
			message: 'Hallo, ik wil graag veilig contact opnemen.',
			name: 'Ada Lovelace',
			startedAt: NOW - contactFormMinSubmitLimit - 1,
			subject: 'Vraag over beveiliging'
		})
	})

	it('invalid visible fields fail with field errors and preserve submitted values', () => {
		const input = {
				...validInput,
				email: ' geen-email ',
				message: ' te kort ',
				name: ' A ',
				subject: ' x '
			},
			result = validateContactFormInput(input, NOW)

		expect(result.success).toBeFalsy()
		if (result.success) {
			throw new Error('Expected contact form validation to fail')
		}
		expect(result.status).toBe(400)
		expect(result.values).toStrictEqual(input)
		expect(result.errors.name?.length).toBeGreaterThan(0)
		expect(result.errors.email?.length).toBeGreaterThan(0)
		expect(result.errors.subject?.length).toBeGreaterThan(0)
		expect(result.errors.message?.length).toBeGreaterThan(0)
	})

	it('honeypot input fails with generic message and no company field error', () => {
		const input = { ...validInput, company: 'Kraken BV' },
			result = validateContactFormInput(input, NOW)

		expect(result.success).toBeFalsy()
		if (result.success) {
			throw new Error('Expected honeypot validation to fail')
		}
		expect(result.message).toBe('Er ging iets mis. Probeer het later opnieuw.')
		expect(result.values).toStrictEqual(input)
		expect(result.errors.company).toBeUndefined()
	})

	it('too-fast submit fails with generic message', () => {
		const input = { ...validInput, startedAt: String(NOW - contactFormMinSubmitLimit + 1) },
			result = validateContactFormInput(input, NOW)

		expect(result.success).toBeFalsy()
		if (result.success) {
			throw new Error('Expected too-fast validation to fail')
		}
		expect(result.message).toBe('Er ging iets mis. Probeer het later opnieuw.')
		expect(result.values).toStrictEqual(input)
	})

	it('expired submit fails with expired-form message', () => {
		const input = { ...validInput, startedAt: String(NOW - contactFormMaxSubmitMS - 1) },
			result = validateContactFormInput(input, NOW)

		expect(result.success).toBeFalsy()
		if (result.success) {
			throw new Error('Expected expired validation to fail')
		}
		expect(result.message).toBe('Dit formulier is verlopen. Herlaad de pagina en probeer opnieuw.')
		expect(result.values).toStrictEqual(input)
	})

	it('reads contact form data as strings with empty fallbacks', () => {
		const formData = new FormData()
		formData.set('name', validInput.name)
		formData.set('email', validInput.email)
		formData.set('subject', validInput.subject)
		formData.set('message', validInput.message)
		formData.set('startedAt', new Blob(['not a string']), 'startedAt.txt')

		expect(readContactFormInput(formData)).toStrictEqual({
			company: '',
			email: validInput.email,
			message: validInput.message,
			name: validInput.name,
			startedAt: '',
			subject: validInput.subject
		})
	})

	it('validates FormData through the shared input reader', () => {
		const formData = new FormData()

		for (const [name, value] of Object.entries(validInput)) {
			formData.set(name, value)
		}

		const result = validateContactFormData(formData, NOW)

		expect(result.success).toBeTruthy()
		if (!result.success) {
			throw new Error('Expected contact form data validation to succeed')
		}
		expect(result.values).toStrictEqual(validInput)
		expect(result.data.email).toBe('ada@example.com')
	})
})
