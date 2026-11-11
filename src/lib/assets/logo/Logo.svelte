<script lang="ts">
	import { LogoAnimation } from '$lib/motion/logo'
	import { resolve } from '$app/paths'
	import { localizeHref } from '$paraglide/runtime'

	interface Props {
		color?: string
		small?: boolean
	}

	const { color = '#101010', small = false }: Props = $props()

	let hoverState = $state(false)

	const hoverEvent = () => {
			hoverState = true
		},
		hoverEndEvent = () => {
			hoverState = false
		}
</script>

<a
	aria-label="Home"
	href={resolve(localizeHref('/'))}
	class="flex items-center"
	onmouseenter={hoverEvent}
	onmouseleave={hoverEndEvent}
	onfocus={hoverEvent}
	onblur={hoverEndEvent}
>
	<div class="relative">
		<svg
			class={small ? 'h-9 w-9' : 'h-12 w-12'}
			viewBox="0 0 17067 17067"
			xmlns="http://www.w3.org/2000/svg"
			xml:space="preserve"
			fill-rule="evenodd"
			clip-rule="evenodd"
			stroke-linejoin="round"
			stroke-miterlimit="2"
		>
			<path
				d="M8526.4 12632.4A1961 1961 0 0 1 9623 12299c1087.6 0 1970.5 883 1970.5 1970.5v931.8c0 482.4-391.6 874.1-874 874.1s-874-391.7-874-874v-931.9a222.5 222.5 0 0 0-445 0v1427c0 482.4-391.6 874-874 874s-874-391.6-874-874v-1427c0 217.7 0 188.1 0 0a222.5 222.5 0 0 0-445 0v1923.2c0 482.4-391.6 874-874 874s-874-391.6-874-874v-1923.2c0-1087.5 883-1970.5 1970.5-1970.5 405.7 0 783 122.9 1096.5 333.4"
				fill="url(#a)"
			/>
			<path
				d="M8533.3 4174.7c-214.3 336.4-442 677.3-671.9 1025.7-946 1433.7-1936 3064.9-1173.9 5420.8 212.2 655.7-148 1360.3-803.6 1572.4-655.7 212.1-1360.3-148-1572.4-803.7-895.7-2768.6-170.2-4845.3 877.7-6629.4 450.5-767.1 963.6-1472.7 1395.7-2159.2 329.3-523.2 617.2-1023.4 715.5-1551.2q13.3-82.2 37.1-161a1242 1242 0 0 1 313-523.1 1242 1242 0 0 1 523.1-313 1239 1239 0 0 1 359.7-53c123.9-.1 244.9 18.3 359.8 53a1242 1242 0 0 1 523 313 1242 1242 0 0 1 313 523.1 1241 1241 0 0 1 37.2 161c98.2 527.8 386.1 1028 715.4 1551.2 432.1 686.5 945.3 1392.1 1395.8 2159.2 1047.8 1784.1 1773.4 3860.8 877.7 6629.4-212.1 655.7-916.7 1015.8-1572.4 803.7s-1015.8-916.7-803.7-1572.4c762.2-2355.9-227.7-3987.1-1173.9-5420.8-229.9-348.4-457.6-689.3-671.9-1025.7"
				fill="url(#b)"
			/>
			<defs>
				<linearGradient
					id="a"
					x1="0"
					y1="0"
					x2="1"
					y2="0"
					gradientUnits="userSpaceOnUse"
					gradientTransform="rotate(90 5017.3 3509)scale(20457.9)"
				>
					<stop offset="0" stop-color="#172c61" />
					<stop offset=".5" stop-color="#365b95" />
					<stop offset="1" stop-color="#416ba7" />
				</linearGradient>
				<linearGradient
					id="b"
					x1="0"
					y1="0"
					x2="1"
					y2="0"
					gradientUnits="userSpaceOnUse"
					gradientTransform="rotate(90 5020.8 3512.5)scale(20457.9)"
				>
					<stop offset="0" stop-color="#172d62" />
					<stop offset=".5" stop-color="#365b95" />
					<stop offset="1" stop-color="#416ba7" />
				</linearGradient>
			</defs>
		</svg>
		<div
			class="absolute top-0 left-0 h-0 overflow-hidden {small ? 'w-9' : 'w-12'}"
			{@attach LogoAnimation(hoverState)}
		>
			<svg
				class={small ? 'h-9 w-9' : 'h-12 w-12'}
				viewBox="0 0 17067 17067"
				xmlns="http://www.w3.org/2000/svg"
				xml:space="preserve"
				fill-rule="evenodd"
				clip-rule="evenodd"
				stroke-linejoin="round"
				stroke-miterlimit="2"
			>
				<path
					fill={color}
					d="M8526.4 12632.4A1961 1961 0 0 1 9623 12299c1087.6 0 1970.5 883 1970.5 1970.5v931.8c0 482.4-391.6 874.1-874 874.1s-874-391.7-874-874v-931.9a222.5 222.5 0 0 0-445 0v1427c0 482.4-391.6 874-874 874s-874-391.6-874-874v-1427c0 217.7 0 188.1 0 0a222.5 222.5 0 0 0-445 0v1923.2c0 482.4-391.6 874-874 874s-874-391.6-874-874v-1923.2c0-1087.5 883-1970.5 1970.5-1970.5 405.7 0 783 122.9 1096.5 333.4"
				/>
				<path
					fill={color}
					d="M8533.3 4174.7c-214.3 336.4-442 677.3-671.9 1025.7-946 1433.7-1936 3064.9-1173.9 5420.8 212.2 655.7-148 1360.3-803.6 1572.4-655.7 212.1-1360.3-148-1572.4-803.7-895.7-2768.6-170.2-4845.3 877.7-6629.4 450.5-767.1 963.6-1472.7 1395.7-2159.2 329.3-523.2 617.2-1023.4 715.5-1551.2q13.3-82.2 37.1-161a1242 1242 0 0 1 313-523.1 1242 1242 0 0 1 523.1-313 1239 1239 0 0 1 359.7-53c123.9-.1 244.9 18.3 359.8 53a1242 1242 0 0 1 523 313 1242 1242 0 0 1 313 523.1 1241 1241 0 0 1 37.2 161c98.2 527.8 386.1 1028 715.4 1551.2 432.1 686.5 945.3 1392.1 1395.8 2159.2 1047.8 1784.1 1773.4 3860.8 877.7 6629.4-212.1 655.7-916.7 1015.8-1572.4 803.7s-1015.8-916.7-803.7-1572.4c762.2-2355.9-227.7-3987.1-1173.9-5420.8-229.9-348.4-457.6-689.3-671.9-1025.7"
				/>
			</svg>
		</div>
	</div>
	<span
		class="xs:block ml-1 hidden {small
			? 'text-2xl'
			: 'text-3xl'} font-extrabold text-balance antialiased"
		style="color: {color}"
	>
		MiniKraken
	</span>
</a>
