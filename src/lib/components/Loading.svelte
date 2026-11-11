<script module lang="ts">
	import { Size } from '$components/properties'
	import type { ResponsiveProperty } from '$components/types'

	/**
	 * @example
	 * const size: Size = 'md'
	 * const size: Size = { base: 'md' }
	 * const size: Size = { base: 'md', lg: 'xl' }
	 */
	export type LoadingSizes = Size.xs | Size.sm | Size.md | Size.lg | Size.xl

	export interface Props {
		show?: boolean
		class?: string
		size?: ResponsiveProperty<LoadingSizes>
	}
</script>

<script lang="ts">
	import { fade } from 'svelte/transition'
	import { tpm } from '$components/utils/transformPseudoModifiers'

	let { size, show = true, class: classValue, ...rest }: Props = $props()

	const classes = $derived(['loading loading-spinner', tpm('loading', size), classValue])
</script>

{#if show}
	<span class={classes} transition:fade {...rest}></span>
{/if}

<style global>
	@import 'daisyui/components/loading.css';
</style>
