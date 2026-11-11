import Github from '$assets/icons/socials/Github.svelte'
import Instagram from '$assets/icons/socials/Instagram.svelte'
import X from '$assets/icons/socials/X.svelte'
import Youtube from '$assets/icons/socials/Youtube.svelte'

const socials = [
	{
		href: 'https://github.com/MiniKrakenIT',
		icon: Github,
		label: 'Github'
	},
	{
		href: 'https://instagram.com/MiniKrakenIT',
		icon: Instagram,
		label: 'Instagram'
	},
	{
		href: 'https://www.youtube.com/@MiniKrakenIT',
		icon: Youtube,
		label: 'Youtube'
	},
	{
		href: 'https://x.com/MiniKrakenIT',
		icon: X,
		label: 'X'
	}
] as const

export default socials
