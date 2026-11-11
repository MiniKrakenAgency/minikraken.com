// See https://svelte.dev/docs/kit/types#app.d.ts
// For information about these interfaces

declare global {
	namespace App {
		interface Error {
			message: string
			errorId: string
		}
		interface Locals {
			i18n: {
				locale: Locale
				baseLocale: Locale
			}
			requestInfo: {
				id: string
			}
		}
		// Interface PageData {}
		// Interface PageState {}
		// Interface Platform {}
	}
}

// oxlint-disable-next-line unicorn/require-module-specifiers
export {}
