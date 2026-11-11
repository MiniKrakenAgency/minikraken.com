import { browser } from '$app/environment'
import { animate } from 'motion'
import type { AnimationOptions, AnimationPlaybackControls } from 'motion'
import type { Attachment } from 'svelte/attachments'

export const LogoAnimation =
	(isOpen: boolean): Attachment =>
	(element) => {
		if (!browser) {
			return
		}

		const animationOptions: AnimationOptions = {
			duration: 0.5,
			ease: 'circOut'
		}

		let animation: AnimationPlaybackControls | undefined,
			currentHeight = `${element.scrollHeight}px`

		const runAnimation = () => {
				animation?.stop()

				animation = animate(
					element,
					{
						height: isOpen ? ['0px', currentHeight] : [currentHeight, '0px']
					},
					animationOptions
				)
			},
			observer = new ResizeObserver(() => {
				currentHeight = `${element.scrollHeight}px`
			})

		observer.observe(element)

		runAnimation()

		return () => {
			observer.disconnect()
			animation?.stop()
			animation = undefined
		}
	}
