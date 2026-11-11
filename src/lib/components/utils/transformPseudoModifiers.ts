import type { ResponsiveProperty, ResponsivePropertyObject } from '$components/types'

const isResponsivePropertyObject = <T extends string>(
	attribute: ResponsiveProperty<T>
): attribute is ResponsivePropertyObject<T> => typeof attribute === 'object'

export const tpm = <T extends string>(
	prefix: string,
	attribute: ResponsiveProperty<T> | undefined
) => {
	if (attribute === undefined) {
		return
	}

	if (isResponsivePropertyObject(attribute)) {
		let string_ = ''

		// For performance reasons, we're not using a for loop
		if (attribute.base !== undefined) {
			string_ += `${prefix}-${attribute.base} `
		}
		if (attribute.xs !== undefined) {
			string_ += `xs:${prefix}-${attribute.xs} `
		}
		if (attribute.sm !== undefined) {
			string_ += `sm:${prefix}-${attribute.sm} `
		}
		if (attribute.md !== undefined) {
			string_ += `md:${prefix}-${attribute.md} `
		}
		if (attribute.lg !== undefined) {
			string_ += `lg:${prefix}-${attribute.lg} `
		}
		if (attribute.xl !== undefined) {
			string_ += `xl:${prefix}-${attribute.xl} `
		}
		if (attribute.hover !== undefined) {
			string_ += `hover:${prefix}-${attribute.hover} `
		}
		if (attribute.active !== undefined) {
			string_ += `active:${prefix}-${attribute.active} `
		}
		if (attribute.disabled !== undefined) {
			string_ += `disabled:${prefix}-${attribute.disabled} `
		}

		return string_.trimEnd()
	}

	return `${prefix}-${attribute}`
}
