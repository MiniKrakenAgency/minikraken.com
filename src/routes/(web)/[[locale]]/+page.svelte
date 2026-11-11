<script lang="ts">
	import Hero from '$components/sections/hero/Hero.svelte'

	import { resolve } from '$app/paths'
</script>

<svelte:head>
	<title>Minikraken - set Sail into worry-free IT</title>
	<meta
		name="description"
		content="Wij helpen jou als KMO efficienter te werken door het gebruik van software dat werkt."
	/>
</svelte:head>

<main class="w-full flex-auto">
	<Hero />

	<div class="rounded-4xl bg-neutral-950 py-20 sm:py-32">
		<div class="mx-auto max-w-7xl px-6 lg:px-8">
			<div class="mx-auto max-w-2xl lg:max-w-none">
				<div class="flex items-center gap-x-8" style="opacity: 1; transform: none;">
					<h2
						class="font-display text-center text-sm font-semibold tracking-wider text-white sm:text-left"
					>
						We’ve worked with hundreds of amazing people
					</h2>
					<div class="h-px flex-auto bg-neutral-800"></div>
				</div>
				<div>
					<ul role="list" class="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
						<li>
							<div style="opacity: 1; transform: none;">
								<img
									alt="Phobia"
									fetchpriority="high"
									width="184"
									height="36"
									decoding="async"
									data-nimg="1"
									style="color:transparent"
									src="https://images.unsplash.com/photo-1573655349936-de6bed86f839?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
								/>
							</div>
						</li>
						<li>
							<div style="opacity: 1; transform: none;">
								<img
									alt="Family Fund"
									fetchpriority="high"
									width="184"
									height="36"
									decoding="async"
									data-nimg="1"
									style="color:transparent"
									src="https://images.unsplash.com/photo-1573655349936-de6bed86f839?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
								/>
							</div>
						</li>
						<li>
							<div style="opacity: 1; transform: none;">
								<img
									alt="Unseal"
									fetchpriority="high"
									width="184"
									height="36"
									decoding="async"
									data-nimg="1"
									style="color:transparent"
									src="https://images.unsplash.com/photo-1573655349936-de6bed86f839?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
								/>
							</div>
						</li>
						<li>
							<div style="opacity: 1; transform: none;">
								<img
									alt="Mail Smirk"
									fetchpriority="high"
									width="184"
									height="36"
									decoding="async"
									data-nimg="1"
									style="color:transparent"
									src="https://images.unsplash.com/photo-1573655349936-de6bed86f839?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
								/>
							</div>
						</li>
						<li>
							<div style="opacity: 1; transform: none;">
								<img
									alt="Home Work"
									fetchpriority="high"
									width="184"
									height="36"
									decoding="async"
									data-nimg="1"
									style="color:transparent"
									src="https://images.unsplash.com/photo-1573655349936-de6bed86f839?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
								/>
							</div>
						</li>
						<li>
							<div style="opacity: 1; transform: none;">
								<img
									alt="Green Life"
									fetchpriority="high"
									width="184"
									height="36"
									decoding="async"
									data-nimg="1"
									style="color:transparent"
									src="https://images.unsplash.com/photo-1573655349936-de6bed86f839?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
								/>
							</div>
						</li>
						<li>
							<div style="opacity: 1; transform: none;">
								<img
									alt="Bright Path"
									fetchpriority="high"
									width="184"
									height="36"
									decoding="async"
									data-nimg="1"
									style="color:transparent"
									src="https://images.unsplash.com/photo-1573655349936-de6bed86f839?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
								/>
							</div>
						</li>
						<li>
							<div style="opacity: 1; transform: none;">
								<img
									alt="North Adventures"
									fetchpriority="high"
									width="184"
									height="36"
									decoding="async"
									data-nimg="1"
									style="color:transparent"
									src="https://images.unsplash.com/photo-1573655349936-de6bed86f839?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
								/>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
	<div class="mx-auto mt-24 max-w-7xl px-6 sm:mt-32 lg:mt-40 lg:px-8">
		<div class="mx-auto max-w-2xl lg:max-w-none">
			<div class="max-w-2xl" style="opacity: 1; transform: none;">
				<h2>
					<span
						class="font-display block text-4xl font-medium tracking-tight text-balance text-neutral-950 sm:text-5xl"
						>Harnessing technology for a brighter future</span
					>
				</h2>
				<div class="mt-6 text-xl text-neutral-600">
					<p>
						We believe technology is the answer to the world’s greatest challenges. It’s also the
						cause, so we find ourselves in bit of a catch 22 situation.
					</p>
				</div>
			</div>
		</div>
	</div>
	<div class="mx-auto mt-16 max-w-7xl px-6 lg:px-8">
		<div class="mx-auto max-w-2xl lg:max-w-none">
			<div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
				<div class="flex" style="opacity: 1; transform: none;">
					<article
						class="relative flex w-full flex-col rounded-3xl p-6 ring-1 ring-neutral-950/5 transition hover:bg-neutral-50 sm:p-8"
					>
						<h3>
							<a href={resolve('/process')}>
								<span class="absolute inset-0 rounded-3xl"></span>
								<img
									alt="FamilyFund"
									loading="lazy"
									width="36"
									height="36"
									decoding="async"
									data-nimg="1"
									class="h-16 w-16"
									style="color:transparent"
									src="https://images.unsplash.com/photo-1573655349936-de6bed86f839?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
								/>
							</a>
						</h3>
						<p class="mt-6 flex gap-x-2 text-sm text-neutral-950">
							<time datetime="2023" class="font-semibold">2023</time>
							<span class="text-neutral-300" aria-hidden="true">/</span>
							<span>Case study</span>
						</p>
						<p class="font-display mt-6 text-2xl font-semibold text-neutral-950">
							Skip the bank, borrow from those you trust
						</p>
						<p class="mt-4 text-base text-neutral-600">
							FamilyFund is a crowdfunding platform for friends and family. Allowing users to take
							personal loans from their network without a traditional financial institution.
						</p>
					</article>
				</div>
				<div class="flex" style="opacity: 1; transform: none;">
					<article
						class="relative flex w-full flex-col rounded-3xl p-6 ring-1 ring-neutral-950/5 transition hover:bg-neutral-50 sm:p-8"
					>
						<h3>
							<a href={resolve('/process')}>
								<span class="absolute inset-0 rounded-3xl"></span>
								<img
									alt="Unseal"
									loading="lazy"
									width="36"
									height="36"
									decoding="async"
									data-nimg="1"
									class="h-16 w-16"
									style="color:transparent"
									src="https://images.unsplash.com/photo-1573655349936-de6bed86f839?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
								/>
							</a>
						</h3>
						<p class="mt-6 flex gap-x-2 text-sm text-neutral-950">
							<time datetime="2022" class="font-semibold">2022</time>
							<span class="text-neutral-300" aria-hidden="true">/</span>
							<span>Case study</span>
						</p>
						<p class="font-display mt-6 text-2xl font-semibold text-neutral-950">
							Get a hodl of your health
						</p>
						<p class="mt-4 text-base text-neutral-600">
							Unseal is the first NFT platform where users can mint and trade NFTs of their own
							personal health records, allowing them to take control of their data.
						</p>
					</article>
				</div>
				<div class="flex" style="opacity: 1; transform: none;">
					<article
						class="relative flex w-full flex-col rounded-3xl p-6 ring-1 ring-neutral-950/5 transition hover:bg-neutral-50 sm:p-8"
					>
						<h3>
							<a href={resolve('/process')}>
								<span class="absolute inset-0 rounded-3xl"></span>
								<img
									alt="Phobia"
									loading="lazy"
									width="36"
									height="36"
									decoding="async"
									data-nimg="1"
									class="h-16 w-16"
									style="color:transparent"
									src="https://images.unsplash.com/photo-1573655349936-de6bed86f839?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
								/>
							</a>
						</h3>
						<p class="mt-6 flex gap-x-2 text-sm text-neutral-950">
							<time datetime="2022" class="font-semibold">2022</time>
							<span class="text-neutral-300" aria-hidden="true">/</span>
							<span>Case study</span>
						</p>
						<p class="font-display mt-6 text-2xl font-semibold text-neutral-950">
							Overcome your fears, find your match
						</p>
						<p class="mt-4 text-base text-neutral-600">
							Find love in the face of fear — Phobia is a dating app that matches users based on
							their mutual phobias so they can be scared together.
						</p>
					</article>
				</div>
			</div>
		</div>
	</div>
	<div class="relative isolate mt-24 bg-neutral-50 py-16 sm:mt-32 sm:py-28 md:py-32 lg:mt-40">
		<svg
			aria-hidden="true"
			class="absolute inset-0 -z-10 h-full w-full mask-[linear-gradient(to_bottom_left,white_50%,transparent_60%)] fill-neutral-100 stroke-neutral-950/5"
		>
			<rect width="100%" height="100%" fill="url(#:Rp7qlba:)" stroke-width="0"></rect>
			<svg x="50%" y="-256" stroke-width="0" class="overflow-visible">
				<path
					transform="translate(64 160)"
					d="M45.119 4.5a11.5 11.5 0 0 0-11.277 9.245l-25.6 128C6.82 148.861 12.262 155.5 19.52 155.5h63.366a11.5 11.5 0 0 0 11.277-9.245l25.6-128c1.423-7.116-4.02-13.755-11.277-13.755H45.119Z"
				></path>
				<path
					transform="translate(128 320)"
					d="M45.119 4.5a11.5 11.5 0 0 0-11.277 9.245l-25.6 128C6.82 148.861 12.262 155.5 19.52 155.5h63.366a11.5 11.5 0 0 0 11.277-9.245l25.6-128c1.423-7.116-4.02-13.755-11.277-13.755H45.119Z"
				></path>
				<path
					transform="translate(288 480)"
					d="M45.119 4.5a11.5 11.5 0 0 0-11.277 9.245l-25.6 128C6.82 148.861 12.262 155.5 19.52 155.5h63.366a11.5 11.5 0 0 0 11.277-9.245l25.6-128c1.423-7.116-4.02-13.755-11.277-13.755H45.119Z"
				></path>
				<path
					transform="translate(512 320)"
					d="M45.119 4.5a11.5 11.5 0 0 0-11.277 9.245l-25.6 128C6.82 148.861 12.262 155.5 19.52 155.5h63.366a11.5 11.5 0 0 0 11.277-9.245l25.6-128c1.423-7.116-4.02-13.755-11.277-13.755H45.119Z"
				></path>
				<path
					transform="translate(544 640)"
					d="M45.119 4.5a11.5 11.5 0 0 0-11.277 9.245l-25.6 128C6.82 148.861 12.262 155.5 19.52 155.5h63.366a11.5 11.5 0 0 0 11.277-9.245l25.6-128c1.423-7.116-4.02-13.755-11.277-13.755H45.119Z"
				></path>
				<path
					transform="translate(320 800)"
					d="M45.119 4.5a11.5 11.5 0 0 0-11.277 9.245l-25.6 128C6.82 148.861 12.262 155.5 19.52 155.5h63.366a11.5 11.5 0 0 0 11.277-9.245l25.6-128c1.423-7.116-4.02-13.755-11.277-13.755H45.119Z"
				></path>
			</svg>
			<defs>
				<pattern
					id=":Rp7qlba:"
					width="96"
					height="480"
					x="50%"
					patternUnits="userSpaceOnUse"
					patternTransform="translate(0 -256)"
					fill="none"
				>
					<path
						d="M128 0 98.572 147.138A16 16 0 0 1 82.883 160H13.117a16 16 0 0 0-15.69 12.862l-26.855 134.276A16 16 0 0 1-45.117 320H-116M64-160 34.572-12.862A16 16 0 0 1 18.883 0h-69.766a16 16 0 0 0-15.69 12.862l-26.855 134.276A16 16 0 0 1-109.117 160H-180M192 160l-29.428 147.138A15.999 15.999 0 0 1 146.883 320H77.117a16 16 0 0 0-15.69 12.862L34.573 467.138A16 16 0 0 1 18.883 480H-52M-136 480h58.883a16 16 0 0 0 15.69-12.862l26.855-134.276A16 16 0 0 1-18.883 320h69.766a16 16 0 0 0 15.69-12.862l26.855-134.276A16 16 0 0 1 109.117 160H192M-72 640h58.883a16 16 0 0 0 15.69-12.862l26.855-134.276A16 16 0 0 1 45.117 480h69.766a15.999 15.999 0 0 0 15.689-12.862l26.856-134.276A15.999 15.999 0 0 1 173.117 320H256M-200 320h58.883a15.999 15.999 0 0 0 15.689-12.862l26.856-134.276A16 16 0 0 1-82.883 160h69.766a16 16 0 0 0 15.69-12.862L29.427 12.862A16 16 0 0 1 45.117 0H128"
					></path>
				</pattern>
			</defs>
		</svg>
		<div class="mx-auto max-w-7xl px-6 lg:px-8">
			<div class="mx-auto max-w-2xl lg:max-w-none">
				<div style="opacity: 1; transform: none;">
					<figure class="mx-auto max-w-4xl">
						<blockquote
							class="font-display relative text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl"
						>
							<p
								class="before:content-['“'] after:content-['”'] sm:before:absolute sm:before:right-full"
							>
								The team at Studio went above and beyond with our onboarding, even finding a way to
								access the user’s microphone without triggering one of those annoying permission
								dialogs.
							</p>
						</blockquote>
						<figcaption class="mt-10">
							<img
								alt="Phobia"
								loading="lazy"
								width="184"
								height="36"
								decoding="async"
								data-nimg="1"
								style="color:transparent"
								src="https://images.unsplash.com/photo-1573655349936-de6bed86f839?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
							/>
						</figcaption>
					</figure>
				</div>
			</div>
		</div>
	</div>
	<div class="mx-auto mt-24 max-w-7xl px-6 sm:mt-32 lg:mt-40 lg:px-8">
		<div class="mx-auto max-w-2xl lg:max-w-none">
			<div class="max-w-2xl" style="opacity: 1; transform: none;">
				<h2>
					<span class="font-display mb-6 block text-base font-semibold text-neutral-950"
						>Services</span
					><span class="sr-only"> - </span><span
						class="font-display block text-4xl font-medium tracking-tight text-balance text-neutral-950 sm:text-5xl"
						>We help you identify, explore and respond to new opportunities.</span
					>
				</h2>
				<div class="mt-6 text-xl text-neutral-600">
					<p>
						As long as those opportunities involve giving us money to re-purpose old projects — we
						can come up with an endless number of those.
					</p>
				</div>
			</div>
		</div>
	</div>
	<div class="mx-auto mt-16 max-w-7xl px-6 lg:px-8">
		<div class="mx-auto max-w-2xl lg:max-w-none">
			<div class="lg:flex lg:items-center lg:justify-end">
				<div class="flex justify-center lg:w-1/2 lg:justify-end lg:pr-12">
					<div class="w-135 flex-none lg:w-180" style="opacity: 1; transform: none;">
						<div
							class="relative flex aspect-719/680 w-full justify-center grayscale lg:justify-end"
						>
							<svg viewBox="0 0 655 680" fill="none" class="h-full">
								<g clip-path="url(#:S1:-clip)" class="group">
									<g
										class="origin-center scale-100 transition duration-500 motion-safe:group-hover:scale-105"
									>
										<foreignObject width="655" height="680">
											<img
												alt=""
												loading="lazy"
												width="2400"
												height="3000"
												decoding="async"
												data-nimg="1"
												class="w-full bg-neutral-100 object-cover"
												style="color:transparent;aspect-ratio:655 / 680"
												sizes="(min-width: 1024px) 41rem, 31rem"
												src="https://images.unsplash.com/photo-1594904351111-a072f80b1a71?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
											/>
										</foreignObject>
									</g>
									<use href="#:S1:-shape" stroke-width="2" class="stroke-neutral-950/10"></use>
								</g>
								<defs>
									<clipPath id=":S1:-clip">
										<path
											id=":S1:-shape"
											d="M537.827 9.245A11.5 11.5 0 0 1 549.104 0h63.366c7.257 0 12.7 6.64 11.277 13.755l-25.6 128A11.5 11.5 0 0 1 586.87 151h-28.275a15.999 15.999 0 0 0-15.689 12.862l-59.4 297c-1.98 9.901 5.592 19.138 15.689 19.138h17.275l.127.001c.85.009 1.701.074 2.549.009 11.329-.874 21.411-7.529 24.88-25.981.002-.012.016-.016.023-.007.008.009.022.005.024-.006l24.754-123.771A11.5 11.5 0 0 1 580.104 321h63.366c7.257 0 12.7 6.639 11.277 13.755l-25.6 128A11.5 11.5 0 0 1 617.87 472H559c-22.866 0-28.984 7.98-31.989 25.931-.004.026-.037.035-.052.014-.015-.02-.048-.013-.053.012l-24.759 123.798A11.5 11.5 0 0 1 490.87 631h-29.132a14.953 14.953 0 0 0-14.664 12.021c-4.3 21.502-23.18 36.979-45.107 36.979H83.502c-29.028 0-50.8-26.557-45.107-55.021l102.4-512C145.096 91.477 163.975 76 185.902 76h318.465c10.136 0 21.179-5.35 23.167-15.288l10.293-51.467Zm-512 160A11.5 11.5 0 0 1 37.104 160h63.366c7.257 0 12.7 6.639 11.277 13.755l-25.6 128A11.5 11.5 0 0 1 74.87 311H11.504c-7.257 0-12.7-6.639-11.277-13.755l25.6-128Z"
											fill-rule="evenodd"
											clip-rule="evenodd"
										></path>
									</clipPath>
								</defs>
							</svg>
						</div>
					</div>
				</div>
				<div>
					<ul
						role="list"
						class="mt-16 text-base text-neutral-600 lg:mt-0 lg:w-1/2 lg:min-w-132 lg:pl-4"
					>
						<li class="group mt-10 first:mt-0">
							<div style="opacity: 1; transform: none;">
								<div
									class="relative pt-10 group-first:pt-0 before:absolute before:top-0 before:left-0 before:h-px before:w-6 before:bg-neutral-950 group-first:before:hidden after:absolute after:top-0 after:right-0 after:left-8 after:h-px after:bg-neutral-950/10 group-first:after:hidden"
								>
									<strong class="font-semibold text-neutral-950">Web development. </strong>We
									specialise in crafting beautiful, high quality marketing pages. The rest of the
									website will be a shell that uses lorem ipsum everywhere.
								</div>
							</div>
						</li>
						<li class="group mt-10 first:mt-0">
							<div style="opacity: 1; transform: none;">
								<div
									class="relative pt-10 group-first:pt-0 before:absolute before:top-0 before:left-0 before:h-px before:w-6 before:bg-neutral-950 group-first:before:hidden after:absolute after:top-0 after:right-0 after:left-8 after:h-px after:bg-neutral-950/10 group-first:after:hidden"
								>
									<strong class="font-semibold text-neutral-950"
										>Application development.
									</strong>We have a team of skilled developers who are experts in the latest app
									frameworks, like Angular 1 and Google Web Toolkit.
								</div>
							</div>
						</li>
						<li class="group mt-10 first:mt-0">
							<div style="opacity: 1; transform: none;">
								<div
									class="relative pt-10 group-first:pt-0 before:absolute before:top-0 before:left-0 before:h-px before:w-6 before:bg-neutral-950 group-first:before:hidden after:absolute after:top-0 after:right-0 after:left-8 after:h-px after:bg-neutral-950/10 group-first:after:hidden"
								>
									<strong class="font-semibold text-neutral-950">E-commerce. </strong>We are at the
									forefront of modern e-commerce development. Which mainly means adding your logo to
									the Shopify store template we’ve used for the past six years.
								</div>
							</div>
						</li>
						<li class="group mt-10 first:mt-0">
							<div style="opacity: 1; transform: none;">
								<div
									class="relative pt-10 group-first:pt-0 before:absolute before:top-0 before:left-0 before:h-px before:w-6 before:bg-neutral-950 group-first:before:hidden after:absolute after:top-0 after:right-0 after:left-8 after:h-px after:bg-neutral-950/10 group-first:after:hidden"
								>
									<strong class="font-semibold text-neutral-950"
										>Custom content management.
									</strong>At Studio we understand the importance of having a robust and customised
									CMS. That’s why we run all of our client projects out of a single, enormous Joomla
									instance.
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
	<div class="mx-auto mt-24 max-w-7xl px-6 sm:mt-32 lg:mt-40 lg:px-8">
		<div class="mx-auto max-w-2xl lg:max-w-none">
			<div
				class="-mx-6 rounded-4xl bg-neutral-950 px-6 py-20 sm:mx-0 sm:py-32 md:px-12"
				style="opacity: 1; transform: none;"
			>
				<div class="mx-auto max-w-4xl">
					<div class="max-w-xl">
						<h2 class="font-display text-3xl font-medium text-balance text-white sm:text-4xl">
							Tell us about your project
						</h2>
						<div class="mt-6 flex">
							<a
								class="inline-flex rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-200"
								href={resolve('/contact')}><span class="relative top-px">Say Hej</span></a
							>
						</div>
						<div class="mt-10 border-t border-white/10 pt-10">
							<h3 class="font-display text-base font-semibold text-white">Our offices</h3>
							<ul role="list" class="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
								<li>
									<address class="text-sm text-neutral-300 not-italic">
										<strong class="text-white">Copenhagen</strong><br />1 Carlsberg Gate<br />1260,
										København, Denmark
									</address>
								</li>
								<li>
									<address class="text-sm text-neutral-300 not-italic">
										<strong class="text-white">Billund</strong><br />24 Lego Allé<br />7190,
										Billund, Denmark
									</address>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</main>
