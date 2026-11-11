<script lang="ts">
	// oxlint-disable-next-line import/no-unassigned-import
	import '$styles/base.css'

	import Logo from '$assets/logo/Logo.svelte'
	import { NavigationAnimation } from '$lib/motion/navigation'
	import type { LayoutProps } from './$types'
	import { onMount } from 'svelte'
	import { PUBLIC_RYBBIT_KEY } from '$env/static/public'
	import { m } from '$paraglide/messages'
	import { getLocale, localizeHref, setLocale } from '$paraglide/runtime'
	import type { Locale } from '$paraglide/runtime'
	import socials from '$data/socials'
	import { footer } from '$data/layouts/footer'
	import { navigation } from '$data/layouts/header'
	// oxlint-disable-next-line import/max-dependencies
	import companyInfo from '$data/companyInfo'
	import { resolve } from '$app/paths'
	import { closeMenu, menuState, toggleMenu } from '$lib/stores/menu.svelte'
	import { invalidateAll, onNavigate } from '$app/navigation'
	import { posts } from '$data/blogposts'
	import { page } from '$app/state'

	const { children }: LayoutProps = $props(),
		navElements: {
			navMenu: Element | null | undefined
			mainContent: Element | null | undefined
		} = {
			mainContent: undefined,
			navMenu: undefined
		}

	onNavigate(() => {
		closeMenu()
	})

	const previewPosts = posts.filter((post) => !post.draft).slice(0, 3),
		locale = getLocale(),
		handleLanguageChange = async ({
			isCurrentLocale,
			locale,
			event
		}: {
			isCurrentLocale: boolean
			locale: Locale
			event: MouseEvent
		}) => {
			event.preventDefault()

			if (isCurrentLocale) {
				return
			}
			setLocale(locale)

			await invalidateAll()
		}

	onMount(() => {
		navElements.navMenu = document.querySelector('#navigation-menu')
		navElements.mainContent = document.querySelector('#main-content')
	})
</script>

<svelte:head>
	<script
		src="https://analytics.minikraken.cloud/api/script.js"
		data-site-id={PUBLIC_RYBBIT_KEY}
		defer
	></script>
</svelte:head>

{#snippet languageButton(preferredLocale: Locale)}
	{@const isCurrentLocale = preferredLocale === locale}
	<a
		href={localizeHref(page.url.pathname, {
			locale: preferredLocale
		})}
		onclick={(event) => handleLanguageChange({ isCurrentLocale, locale: preferredLocale, event })}
		class={{
			'pointer-none cursor-default text-neutral-400 underline': isCurrentLocale,
			'cursor-pointer font-bold transition-colors duration-400 hover:text-teal-500':
				!isCurrentLocale,
			'mx-2': true
		}}
	>
		{preferredLocale.toUpperCase()}
	</a>
{/snippet}

{#snippet LanguageSelector()}
	<nav class="locale-switcher font-caption flex" aria-label="Languages" data-sveltekit-reload>
		{@render languageButton('nl')}
		<span>/</span>
		{@render languageButton('en')}
	</nav>
{/snippet}

<header class="relative block h-2">
	<div id="navigation-menu" class="absolute inset-x-0 top-0 overflow-hidden bg-neutral-950 pt-2">
		<div class="bg-neutral-800">
			<div class="bg-neutral-950 pt-14 pb-16">
				<div class="mx-auto max-w-7xl px-6 lg:px-8">
					<div class="mx-auto max-w-2xl lg:max-w-none">
						<div class="flex items-center justify-between">
							<Logo color="#bdc2c7" />
							<div class="flex items-center gap-x-8">
								{@render LanguageSelector()}
								<a
									class="contact-button contact-button-light"
									href={resolve(localizeHref('/contact'))}
								>
									<span class="relative top-px">{m.nav_contact_button()}</span>
								</a>
								<button
									onclick={toggleMenu}
									type="button"
									aria-expanded={menuState()}
									aria-controls="navigation-menu"
									class="group -m-2.5 cursor-pointer rounded-full p-2.5 transition hover:bg-neutral-300/10"
									aria-label="Toggle navigation"
								>
									<svg
										viewBox="0 0 24 24"
										aria-hidden="true"
										class="h-6 w-6 fill-neutral-300 group-hover:fill-neutral-400"
									>
										<path d="m5.636 4.223 14.142 14.142-1.414 1.414L4.222 5.637z"></path>
										<path d="M4.222 18.363 18.364 4.22l1.414 1.414L5.636 19.777z"></path>
									</svg>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<nav class="font-display my-px text-5xl font-medium tracking-tight text-neutral-300">
				{#each navigation as row}
					<div class="even:mt-px sm:bg-neutral-950">
						<div class="mx-auto max-w-7xl px-6 lg:px-8">
							<div class="mx-auto max-w-2xl lg:max-w-none">
								<div class="grid grid-cols-1 sm:grid-cols-2">
									{#each row as navigationItem (navigationItem.label)}
										<a
											class="group relative isolate -mx-6 bg-neutral-950 px-6 py-10 even:mt-px sm:mx-0 sm:px-0 sm:py-16 sm:odd:pr-16 sm:even:mt-0 sm:even:border-l sm:even:border-neutral-800 sm:even:pl-16"
											href={resolve(localizeHref(navigationItem.page))}
										>
											<span class="flex h-full w-full items-center">
												{navigationItem.label}
											</span>
											<span
												class="transition-duration-300 absolute inset-y-0 -z-10 w-screen overflow-hidden bg-neutral-900 opacity-0 transition-opacity group-odd:right-0 group-even:left-0 group-hover:opacity-90"
											></span>
										</a>
									{/each}
								</div>
							</div>
						</div>
					</div>
				{/each}
			</nav>
			<div
				class="relative bg-neutral-950 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-neutral-800"
			>
				<div class="mx-auto max-w-7xl px-6 lg:px-8">
					<div class="mx-auto max-w-2xl lg:max-w-none">
						<div class="grid grid-cols-1 gap-y-10 pt-10 pb-16 sm:grid-cols-2 sm:pt-16">
							<div>
								<h2 class="font-display text-base font-semibold text-neutral-300">
									{m.header_office()}
								</h2>
								<ul role="list" class="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
									<li>
										<a href={companyInfo.mapsLink}>
											<address class="text-sm text-neutral-300 not-italic">
												<strong class="text-neutral-300">HQ</strong>
												<span class="hover:underline">
													<br />{companyInfo.address}
													{companyInfo.houseNumber}<br />{companyInfo.postalCode}
													{companyInfo.city}, {companyInfo.country}
												</span>
											</address>
										</a>
									</li>
								</ul>
							</div>
							<div class="sm:border-l sm:border-transparent sm:pl-16">
								<h2 class="font-display text-base font-semibold text-neutral-300">
									{m.header_follow_us()}
								</h2>
								<ul role="list" class="mt-6 flex gap-x-10 text-neutral-300">
									{#each socials as social (social.label)}
										<li>
											<a
												aria-label="Link to our {social.label} Company page"
												class="transition hover:text-neutral-200"
												href={social.href}
												target="_blank"
												rel="noopener noreferrer"
											>
												<social.icon class="h-6 w-6" />
											</a>
										</li>
									{/each}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</header>

<div
	{@attach NavigationAnimation({
		isOpen: menuState(),
		mainContent: navElements.mainContent,
		navMenu: navElements.navMenu
	})}
	class="relative z-10 flex flex-auto overflow-hidden rounded-t-[2.5rem]"
>
	<div class="absolute right-0 left-0 z-40 pt-14" id="main-content" aria-hidden={!menuState}>
		<div class="relative mx-auto max-w-7xl px-6 lg:px-8">
			<div class="mx-auto max-w-2xl lg:max-w-none">
				<div class="flex items-center justify-between">
					<Logo color="#e7e5e4" />
					<div class="flex items-center gap-x-8">
						<a class="contact-button" href={resolve(localizeHref('/contact'))}>
							<span class="relative top-px">{m.nav_contact_button()}</span>
						</a>
						<button
							type="button"
							onclick={toggleMenu}
							aria-expanded={menuState()}
							aria-controls="navigation-menu"
							class="group -m-2.5 cursor-pointer rounded-full p-2.5 transition hover:bg-neutral-950/10"
							aria-label="Toggle navigation"
						>
							<svg
								viewBox="0 0 24 24"
								aria-hidden={!menuState()}
								class="h-6 w-6 fill-stone-100 group-hover:fill-neutral-400"
							>
								<path d="M2 6h20v2H2zM2 16h20v2H2z"></path>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="relative flex w-full flex-col">
		{@render children?.()}

		<footer class="px-auto w-full bg-white px-6 pt-24 sm:pt-32 lg:px-8 lg:pt-40">
			<div class="mx-auto max-w-2xl lg:max-w-7xl">
				<div>
					<div class="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
						<nav>
							<ul role="list" class="grid grid-cols-2 gap-8 sm:grid-cols-3">
								<li>
									<div class="font-display text-sm font-semibold tracking-wider text-neutral-950">
										Blog
									</div>
									<ul role="list" class="mt-4 text-sm text-neutral-700">
										{#each previewPosts as post (post.slug)}
											<li class="mt-4 truncate">
												<a
													class="transition hover:text-neutral-950"
													href={resolve(localizeHref(post.page))}
												>
													{post.shortTitle[locale]}
												</a>
											</li>
										{/each}
										<li class="mt-4">
											<a
												class="transition hover:text-neutral-950"
												href={resolve(localizeHref('/blog'))}
												>See all <span aria-hidden="true">→</span></a
											>
										</li>
									</ul>
								</li>
								{#each footer as footerItem (footerItem.sectionName)}
									<li>
										<div class="font-display text-sm font-semibold tracking-wider text-neutral-950">
											{footerItem.sectionName}
										</div>
										<ul role="list" class="mt-4 text-sm text-neutral-700">
											{#each footerItem.items as item (item.label)}
												<li class="mt-4">
													{#if 'page' in item}
														<a
															class="transition hover:text-neutral-950"
															href={resolve(localizeHref(item.page))}
														>
															{item.label}
														</a>
													{:else}
														<a class="transition hover:text-neutral-950" href={item.href}>
															{item.label}
														</a>
													{/if}
												</li>
											{/each}
										</ul>
									</li>
								{/each}
								<li class="text-neutral-700">
									{@render LanguageSelector()}
								</li>
							</ul>
						</nav>
						<div class="flex lg:justify-end">
							<form class="max-w-sm">
								<h2 class="font-display text-sm font-semibold tracking-wider text-neutral-950">
									Sign up for our newsletter
								</h2>
								<p class="mt-4 text-sm text-neutral-700">
									Subscribe to get the latest design news, articles, resources and inspiration.
								</p>
								<div class="relative mt-6">
									<input
										type="email"
										placeholder="Email address"
										autocomplete="email"
										aria-label="Email address"
										class="block w-full rounded-2xl border border-neutral-300 bg-transparent py-4 pr-20 pl-6 text-base/6 text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-950 focus:ring-neutral-950/5 focus:outline-hidden"
									/>
									<div class="absolute inset-y-1 right-1 flex justify-end">
										<button
											type="submit"
											aria-label="Submit"
											class="flex aspect-square h-full items-center justify-center rounded-xl bg-neutral-950 text-white transition hover:bg-neutral-800"
										>
											<svg viewBox="0 0 16 6" aria-hidden="true" class="w-4">
												<path
													fill="currentColor"
													fill-rule="evenodd"
													clip-rule="evenodd"
													d="M16 3 10 .5v2H0v1h10v2L16 3Z"
												></path>
											</svg>
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
					<div
						class="mt-24 mb-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-t border-neutral-950/10 pt-12"
					>
						<Logo small={true} />
						<p class="text-sm text-neutral-700">
							© MiniKraken {new Date().getFullYear()}
						</p>
					</div>
				</div>
			</div>
		</footer>
	</div>
</div>

<style global>
	@reference "$styles/base.css";

	:root {
		@apply bg-neutral-950;
	}

	::selection {
		@apply bg-teal-950 text-teal-500;
	}

	.contact-button {
		@apply inline-flex rounded-full bg-slate-950 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-slate-700;
	}

	.contact-button-light {
		@apply bg-neutral-300 text-neutral-950 hover:bg-neutral-400;
	}
</style>
