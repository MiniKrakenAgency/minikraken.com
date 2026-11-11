import { m } from '$paraglide/messages'

export const navigation = [
	[
		{
			label: m.nav_realisations(),
			page: '/realisations'
		},
		{
			label: m.nav_our_process(),
			page: '/process'
		}
	],
	[
		{
			label: m.nav_about_us(),
			page: '/about'
		},
		{
			label: m.nav_blog(),
			page: '/blog'
		}
	]
] as const
