import * as v from 'valibot'

const EXPIRED_FORM_MESSAGE = 'Dit formulier is verlopen. Herlaad de pagina en probeer opnieuw.',
	GENERIC_SPAM_MESSAGE = 'Er ging iets mis. Probeer het later opnieuw.',
	VALIDATION_ERROR_MESSAGE = 'Controleer de gemarkeerde velden en probeer opnieuw.'

export const contactFormMinSubmitLimit = 3000
export const contactFormMaxSubmitMS = 1_800_000

export const ContactFormSchema = v.object({
	company: v.optional(v.string(), ''),
	email: v.pipe(
		v.string('Vul je e-mailadres in.'),
		v.trim(),
		v.toLowerCase(),
		v.nonEmpty('Vul je e-mailadres in.'),
		v.email('Vul een geldig e-mailadres in.'),
		v.maxLength(254, 'Je e-mailadres mag maximaal 254 tekens bevatten.')
	),
	message: v.pipe(
		v.string('Vul je bericht in.'),
		v.trim(),
		v.nonEmpty('Vul je bericht in.'),
		v.minLength(10, 'Je bericht moet minstens 10 tekens bevatten.'),
		v.maxLength(2000, 'Je bericht mag maximaal 2000 tekens bevatten.')
	),
	name: v.pipe(
		v.string('Vul je naam in.'),
		v.trim(),
		v.nonEmpty('Vul je naam in.'),
		v.minLength(2, 'Je naam moet minstens 2 tekens bevatten.'),
		v.maxLength(120, 'Je naam mag maximaal 120 tekens bevatten.')
	),
	startedAt: v.pipe(
		v.string('Het formulier kon niet worden gevalideerd.'),
		v.regex(/^\d+$/, 'Het formulier kon niet worden gevalideerd.'),
		v.transform(Number)
	),
	subject: v.pipe(
		v.string('Vul een onderwerp in.'),
		v.trim(),
		v.nonEmpty('Vul een onderwerp in.'),
		v.minLength(3, 'Het onderwerp moet minstens 3 tekens bevatten.'),
		v.maxLength(160, 'Het onderwerp mag maximaal 160 tekens bevatten.')
	)
})

export type ContactFormInput = v.InferInput<typeof ContactFormSchema>
export type ContactFormOutput = v.InferOutput<typeof ContactFormSchema>
export type ContactFormErrors = NonNullable<v.FlatErrors<typeof ContactFormSchema>['nested']>

export const contactFormInitialInput = {
	company: '',
	email: '',
	message: '',
	name: '',
	startedAt: '0',
	subject: ''
} satisfies ContactFormInput

export type ContactFormValidationResult =
	| { success: true; data: ContactFormOutput; values: ContactFormInput }
	| {
			success: false
			status: 400
			message: string
			values: ContactFormInput
			errors: ContactFormErrors
	  }

export function readContactFormInput(formData: FormData): ContactFormInput {
	return {
		company: readFormDataString(formData, 'company'),
		email: readFormDataString(formData, 'email'),
		message: readFormDataString(formData, 'message'),
		name: readFormDataString(formData, 'name'),
		startedAt: readFormDataString(formData, 'startedAt'),
		subject: readFormDataString(formData, 'subject')
	}
}

export function validateContactFormInput(
	input: ContactFormInput,
	now = Date.now()
): ContactFormValidationResult {
	const result = v.safeParse(ContactFormSchema, input)

	if (!result.success) {
		return fail(
			VALIDATION_ERROR_MESSAGE,
			input,
			v.flatten<typeof ContactFormSchema>(result.issues).nested
		)
	}

	if (result.output.company !== '') {
		return fail(GENERIC_SPAM_MESSAGE, input)
	}

	const elapsedMs = now - result.output.startedAt

	if (elapsedMs < contactFormMinSubmitLimit) {
		return fail(GENERIC_SPAM_MESSAGE, input)
	}

	if (elapsedMs > contactFormMaxSubmitMS) {
		return fail(EXPIRED_FORM_MESSAGE, input)
	}

	return { data: result.output, success: true, values: input }
}

export function validateContactFormData(
	formData: FormData,
	now = Date.now()
): ContactFormValidationResult {
	return validateContactFormInput(readContactFormInput(formData), now)
}

function readFormDataString(formData: FormData, name: keyof ContactFormInput): string {
	const value = formData.get(name)

	return typeof value === 'string' ? value : ''
}

function fail(
	message: string,
	values: ContactFormInput,
	errors: ContactFormErrors = {}
): Extract<ContactFormValidationResult, { success: false }> {
	return { errors, message, status: 400, success: false, values }
}
