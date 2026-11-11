<script lang="ts">
	import { onMount } from 'svelte'
	import { fade } from 'svelte/transition'
	import { Field, Form, createForm, setInput } from '@formisch/svelte'
	import { sendContact } from './contact.remote'
	import Button from '$components/base/Button.svelte'
	import Input from '$components/base/Input.svelte'
	import TextArea from '$components/base/TextArea.svelte'
	import Loading from '$components/Loading.svelte'
	import { Color, Shape } from '$components/properties'
	import { ContactFormSchema } from '$lib/forms/contact'

	const contactForm = createForm({
		initialInput: { company: '', email: '', message: '', name: '', startedAt: '0', subject: '' },
		revalidate: 'input',
		schema: ContactFormSchema,
		validate: 'submit'
	})

	let isFormShown = $state(true),
		serverError = $state<string | undefined>()

	onMount(() => {
		setInput(contactForm, { input: String(Date.now()), path: ['startedAt'] })
	})

	const handleSubmit = async (output: import('valibot').InferOutput<typeof ContactFormSchema>) => {
		serverError = undefined
		try {
			await sendContact({ ...output, startedAt: String(output.startedAt) })
			isFormShown = false
		} catch {
			serverError = 'Er ging iets mis. Probeer het later opnieuw.'
		}
	}
</script>

<div class="relative overflow-auto bg-gray-600 py-20 sm:py-32">
	<div class="mx-auto mt-5 mb-15 max-w-2xl text-center">
		<h2 class="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">Contacteer ons!</h2>
		<p class="text-passive-300 mt-2 text-lg/8">
			Heeft u een vraag of wilt u meer informatie? Wij staan klaar om u te helpen!
		</p>
	</div>
	<div
		class="flex flex-col items-stretch justify-center gap-8 px-4 md:flex-row md:items-start md:px-8 lg:px-16"
	>
		<!-- Form card -->
		<div class="mx-auto w-full max-w-125 rounded-3xl bg-base-100 px-5 py-15 shadow-md">
			<h2 class="text-center text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
				Stuur ons een bericht!
			</h2>
			{#if isFormShown}
				<div class="relative mt-10 flex flex-col items-center justify-center">
					{#if serverError}
						<p class="mb-4 text-sm text-error" transition:fade>{serverError}</p>
					{/if}
					<Form
						of={contactForm}
						onsubmit={handleSubmit}
						class={['w-full max-w-sm', contactForm.isSubmitting && 'blur-sm']}
					>
						<Field of={contactForm} path={['name']}>
							{#snippet children(field)}
								<fieldset class="fieldset">
									<legend class="fieldset-legend">Naam</legend>
									<Input
										type="text"
										value={field.input}
										errors={field.errors ?? []}
										class="w-full"
										placeholder="Voor- en achternaam"
										disabled={contactForm.isSubmitting}
										{...field.props}
									/>
								</fieldset>
							{/snippet}
						</Field>

						<Field of={contactForm} path={['email']}>
							{#snippet children(field)}
								<fieldset class="fieldset">
									<legend class="fieldset-legend">E-mailadres</legend>
									<Input
										type="email"
										value={field.input}
										errors={field.errors ?? []}
										class="w-full"
										placeholder="john.doe@voorbeeld.be"
										disabled={contactForm.isSubmitting}
										{...field.props}
									/>
								</fieldset>
							{/snippet}
						</Field>

						<Field of={contactForm} path={['subject']}>
							{#snippet children(field)}
								<fieldset class="fieldset">
									<legend class="fieldset-legend">Onderwerp</legend>
									<Input
										type="text"
										value={field.input}
										errors={field.errors ?? []}
										class="w-full"
										placeholder="Ik wil graag meer weten over..."
										disabled={contactForm.isSubmitting}
										{...field.props}
									/>
								</fieldset>
							{/snippet}
						</Field>

						<Field of={contactForm} path={['message']}>
							{#snippet children(field)}
								<fieldset class="fieldset">
									<legend class="fieldset-legend">Uw bericht</legend>
									<TextArea
										value={field.input}
										errors={field.errors ?? []}
										class="w-full resize-none"
										placeholder="Ik ben overtuigd! Ik wil graag meer informatie over..."
										disabled={contactForm.isSubmitting}
										{...field.props}
									/>
								</fieldset>
							{/snippet}
						</Field>

						<!-- Hidden anti-spam fields -->
						<Field of={contactForm} path={['startedAt']}>
							{#snippet children(field)}
								<input type="hidden" {...field.props} value={field.input} />
							{/snippet}
						</Field>

						<!-- Honeypot -->
						<Field of={contactForm} path={['company']}>
							{#snippet children(field)}
								<input
									type="text"
									{...field.props}
									value={field.input}
									class="pointer-events-none absolute h-px w-px opacity-0"
									tabindex="-1"
									autocomplete="off"
								/>
							{/snippet}
						</Field>

						<Button
							color={{ base: Color.primary }}
							shape={Shape.block}
							disabled={contactForm.isSubmitting}
							type="submit">Verstuur</Button
						>
					</Form>
					{#if contactForm.isSubmitting}
						<span class="absolute inset-0 flex items-center justify-center" transition:fade>
							<Loading />
						</span>
					{/if}
				</div>
			{:else}
				<div class="mt-10 text-center" transition:fade>
					<p class="text-lg font-semibold text-success">Bedankt voor uw bericht!</p>
					<p class="mt-2 text-base-content/70">Wij nemen zo snel mogelijk contact met u op.</p>
				</div>
			{/if}
		</div>

		<!-- Contact info panel -->
		<div class="mx-auto w-full max-w-125 rounded-3xl bg-base-100 px-5 py-15 shadow-md">
			<h2 class="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">Direct contact</h2>
			<p class="mt-4 text-base text-base-content/70">
				Liever direct bellen of mailen? Wij zijn bereikbaar via de onderstaande kanalen.
			</p>
			<ul class="mt-8 space-y-6">
				<li class="flex items-center gap-4">
					<span class="text-2xl text-primary">📞</span>
					<div>
						<p class="text-xs font-medium tracking-widest text-base-content/50 uppercase">
							Telefoon
						</p>
						<a
							href="tel:+32447773567"
							class="text-base font-semibold text-base-content hover:underline"
						>
							+32 4 47 77 35 67
						</a>
					</div>
				</li>
				<li class="flex items-center gap-4">
					<span class="text-2xl text-primary">✉️</span>
					<div>
						<p class="text-xs font-medium tracking-widest text-base-content/50 uppercase">E-mail</p>
						<a
							href="mailto:contact@minikraken.com"
							class="text-base font-semibold text-base-content hover:underline"
						>
							contact@minikraken.com
						</a>
					</div>
				</li>
			</ul>
		</div>
	</div>
</div>

<style>
	@import 'daisyui/components/fieldset.css';
</style>
