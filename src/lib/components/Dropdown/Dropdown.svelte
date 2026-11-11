<script module lang="ts">
	export const Alignment = {
		center: 'center',
		end: 'end',
		start: 'start'
	} as const

	export const Placement = {
		bottom: 'bottom',
		left: 'left',
		right: 'right',
		top: 'top'
	} as const

	export const Modifier = {
		hover: 'hover',
		open: 'open'
	} as const

	export interface ListAnchor {
		text: string
		href: string
	}

	export interface ListButton {
		text: string
		clickHandler: () => void
	}

	export type ListItem = ListAnchor | ListButton

	export type ListItems = ListItem[]

	export const isListAnchor = (item: ListItem): item is ListAnchor =>
		(item as ListAnchor).href !== undefined
</script>

<script lang="ts">
	import { nopeid } from 'nope-id/non-secure'
	import type { Snippet } from 'svelte'

	interface Props {
		id?: string
		/*Modifier?: Modifier
		placement?: Placement
		alignment?: Alignment
		class?: string*/
		children: Snippet
	}

	const {
			id = nopeid(5),
			/*Modifier,
	placement,
	alignment,
	class: styleClasses,
	...rest*/ children
		}: Props = $props(),
		list: ListItems = [
			{
				href: '#',
				text: 'Item 1'
			},
			{
				href: '#',
				text: 'Item 2'
			},
			{
				clickHandler: () => {
					console.log('Item 3 clicked')
				},
				text: 'Item 3'
			},
			{
				href: '#',
				text: 'Item 4'
			},
			{
				href: '#',
				text: 'Item 5'
			}
		]
</script>

{#snippet listItemButton(item: ListButton)}
	<button onclick={item.clickHandler}>
		{item.text}
	</button>
{/snippet}

{#snippet listItemAnchor(item: ListAnchor)}
	<a href={item.href}>
		{item.text}
	</a>
{/snippet}

<div data-popovertarget={id} style="anchor-name:--anchor-1">
	{@render children()}
</div>

<ul
	class="menu dropdown w-52 rounded-box bg-base-100 shadow-sm"
	data-popover={id}
	style="position-anchor:--anchor-1"
>
	{#each list as item}
		<li>
			{#if isListAnchor(item)}
				{@render listItemAnchor(item)}
			{:else}
				{@render listItemButton(item)}
			{/if}
		</li>
	{/each}
</ul>

<style global>
	/*@import 'daisyui/components/dropdown.css';*/
</style>
