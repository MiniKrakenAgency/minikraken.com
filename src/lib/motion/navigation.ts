import { browser } from '$app/environment'
import { animate } from 'motion'
import type { AnimationOptions, AnimationPlaybackControls } from 'motion'
import type { Attachment } from 'svelte/attachments'

export const NavigationAnimation =
	({
		navMenu,
		isOpen,
		mainContent
	}: {
		navMenu: Element | null | undefined
		mainContent: Element | null | undefined
		isOpen: boolean
	}): Attachment =>
	(element) => {
		if (!browser || !navMenu) {
			return
		}

		const navHeight = navMenu.scrollHeight,
			target = isOpen ? navHeight : 0,
			animationOptions: AnimationOptions = {
				duration: 0.7,
				ease: [0.3, 0, 0, 1]
			}

		let animation: AnimationPlaybackControls | undefined,
			navAnimation: AnimationPlaybackControls | undefined

		animation?.pause()
		navAnimation?.pause()

		animation = animate(element, { y: target }, animationOptions)
		navAnimation = animate(mainContent, { y: 0 - target }, animationOptions)

		return () => {
			navAnimation?.stop()
			animation?.stop()
			navAnimation = undefined
			animation = undefined
		}
	}
