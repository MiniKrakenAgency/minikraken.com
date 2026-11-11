import { deLocalizeUrl } from '$lib/i18n/paraglide/runtime'
import type { Reroute } from '@sveltejs/kit'

export const reroute: Reroute = (request) => deLocalizeUrl(request.url).pathname
