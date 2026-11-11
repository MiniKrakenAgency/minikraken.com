import type { RequestHandler } from '@sveltejs/kit'

import * as sitemap from 'super-sitemap/sveltekit'
import { localizeHref } from '$paraglide/runtime'

// eslint-disable-next-line unicorn/consistent-boolean-name
export const prerender = true
//Todo: remove this when we have a cms. And make sure it loads all routes that are available from the cms

export const GET: RequestHandler = async () =>
	sitemap.response({
		additionalPaths: [],
		defaultChangefreq: 'daily',
		defaultPriority: 0.7,
		excludeRoutePatterns: [/\/api\/(.*)/],
		headers: {},
		locales: {
			alternates: ['en'],
			default: 'nl'
		},
		origin: 'https://minikraken.com',
		paramValues: {},
		processPaths: (paths) => {
			console.log(paths)
			return paths.map(({ path, ...rest }) => ({
				...rest,
				alternates: [{ hreflang: 'en', lang: 'en', path: localizeHref(path, { locale: 'en' }) }],
				path: localizeHref(path, { locale: 'nl' })
			}))
		},
		sort: 'alpha'
	})
