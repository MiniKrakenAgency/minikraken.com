import socials from '$data/socials'
import { m } from '$paraglide/messages'

export const footer = [
	{
		items: [
			{
				label: m.nav_about_us(),
				page: '/about'
			},
			{
				label: m.nav_our_process(),
				page: '/process'
			},
			{
				label: m.nav_blog(),
				page: '/blog'
			},
			{
				label: m.nav_contact_button(),
				page: '/contact'
			}
		],
		sectionName: 'Company'
	},
	{
		items: [
			{
				label: m.legal_cookie_policy_name(),
				page: '/legal/cookie-policy'
			},
			{
				label: m.legal_privacy_policy_name(),
				page: '/legal/privacy-policy'
			},
			{
				label: m.legal_terms_of_service_name(),
				page: '/legal/terms-of-service'
			},
			{
				label: 'Sitemap',
				page: '/sitemap.xml'
			}
		],
		sectionName: 'Links'
	},
	{
		items: socials,
		sectionName: 'Connect'
	}
] as const
