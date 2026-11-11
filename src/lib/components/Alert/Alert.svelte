<script module lang="ts">
	import { Color, Shape, Size, Variant } from '$components/properties'
	import type { ResponsiveProperty } from '$components/types'
	import type { Snippet } from 'svelte'
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements'

	/**
	 * @example
	 * color={ Color.primary }
	 * color={ base: Color.primary }
	 * color={ base: Color.primary, md: Color.secondary }
	 */
	export type ButtonColors =
		| Color.primary
		| Color.secondary
		| Color.accent
		| Color.info
		| Color.success
		| Color.warning
		| Color.error
		| Color.neutral

	/**
	 * @example
	 * const size: Size = 'md'
	 * const size: Size = { base: 'md' }
	 * const size: Size = { base: 'md', lg: 'xl' }
	 */
	export type ButtonSizes = Size.xs | Size.sm | Size.md | Size.lg | Size.xl

	/**
	 * @example
	 * style='outline'
	 * style={ base: 'outline' }
	 * style={ base: 'outline', md: 'soft' }
	 */
	export type ButtonVariants =
		| Variant.outline
		| Variant.soft
		| Variant.ghost
		| Variant.link
		| Variant.active
		| Variant.disabled

	/**
	 * @example
	 * modifier='wide'
	 * modifier={ base: 'wide' }
	 * modifier={ base: 'wide', md: 'square' }
	 */
	export type ButtonShapes = Shape.wide | Shape.block | Shape.square | Shape.circle

	// Props that infer the tag type from the presence of `href`
	export type Props = (
		| Omit<HTMLAnchorAttributes, 'color' | 'size' | 'style' | 'shape'>
		| Omit<HTMLButtonAttributes, 'color' | 'size' | 'style' | 'shape'>
	) & {
		color?: ResponsiveProperty<ButtonColors>
		size?: ResponsiveProperty<ButtonSizes>
		variant?: ResponsiveProperty<ButtonVariants>
		shape?: ResponsiveProperty<ButtonShapes>
		href?: string | null
		children: Snippet
	}
</script>

<script lang="ts">
</script>

<div role="alert" class="alert alert-vertical sm:alert-horizontal">
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		class="h-6 w-6 shrink-0 stroke-info"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
		></path>
	</svg>
	<span>we use cookies for no reason.</span>
	<div>
		<button class="btn btn-sm">Deny</button>
		<button class="btn btn-primary btn-sm">Accept</button>
	</div>
</div>

<style>
	@import 'daisyui/components/alert.css';
</style>
