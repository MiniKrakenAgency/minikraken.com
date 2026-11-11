<script lang="ts">
	import { onMount } from 'svelte'

	let canvas: HTMLCanvasElement,
		context: CanvasRenderingContext2D,
		offContext: OffscreenCanvasRenderingContext2D,
		offscreen: OffscreenCanvas

	const RAY_OPTIONS = [
			{
				deg: 0.588,
				delay: 2.585,
				duration: 2.345,
				length: -3.068,
				rotate: 1.588,
				thickness: 13.974
			},
			{
				deg: 0.307,
				delay: 2.943,
				duration: 2.381,
				length: -14.922,
				rotate: 1.787,
				thickness: 26.956
			},
			{
				deg: 0.905,
				delay: 2.237,
				duration: 1.724,
				length: 43.818,
				rotate: -1.366,
				thickness: 12.605
			},
			{
				deg: 0.345,
				delay: 2.227,
				duration: 2.288,
				length: -25.987,
				rotate: 0.497,
				thickness: 12.551
			},
			{
				deg: 0.912,
				delay: 2.135,
				duration: 1.763,
				length: -26.503,
				rotate: 0.709,
				thickness: 28.389
			},
			{
				deg: 0.893,
				delay: 2.632,
				duration: 2.231,
				length: 31.231,
				rotate: 1.156,
				thickness: 14.234
			},
			{
				deg: 0.41,
				delay: 2.798,
				duration: 1.309,
				length: -11.775,
				rotate: 1.608,
				thickness: 16.212
			},
			{
				deg: 0.106,
				delay: 2.813,
				duration: 1.069,
				length: -1.242,
				rotate: 0.896,
				thickness: 22.723
			},
			{
				deg: 0.153,
				delay: 2.926,
				duration: 1.174,
				length: 26.791,
				rotate: 1.364,
				thickness: 32.807
			},
			{
				deg: 0.094,
				delay: 2.217,
				duration: 1.341,
				length: -31.363,
				rotate: 3.573,
				thickness: 12.159
			},
			{
				deg: 0.089,
				delay: 2.193,
				duration: 2.093,
				length: 19.791,
				rotate: 2.289,
				thickness: 8.897
			},
			{
				deg: 0.38,
				delay: 2.928,
				duration: 1.167,
				length: 22.795,
				rotate: 0.031,
				thickness: 27.335
			},
			{
				deg: 0.313,
				delay: 2.238,
				duration: 1.401,
				length: -48.713,
				rotate: -3.075,
				thickness: 18.587
			},
			{
				deg: 0.044,
				delay: 2.162,
				duration: 1.663,
				length: 25.624,
				rotate: 0.475,
				thickness: 14.382
			},
			{ deg: 0.516, delay: 2.793, duration: 1.45, length: 39.886, rotate: 0.57, thickness: 13.813 },
			{
				deg: 0.915,
				delay: 2.358,
				duration: 2.411,
				length: -34.64,
				rotate: 0.379,
				thickness: 25.743
			},
			{
				deg: 0.661,
				delay: 2.836,
				duration: 1.039,
				length: 36.216,
				rotate: -1.366,
				thickness: 8.16
			},
			{
				deg: 0.729,
				delay: 2.639,
				duration: 2.348,
				length: -47.191,
				rotate: -3.501,
				thickness: 15.875
			},
			{
				deg: 0.778,
				delay: 2.969,
				duration: 1.303,
				length: -34.203,
				rotate: 1.48,
				thickness: 19.624
			},
			{
				deg: 0.584,
				delay: 2.994,
				duration: 2.457,
				length: 21.513,
				rotate: 0.007,
				thickness: 31.74
			},
			{
				deg: 0.16,
				delay: 2.688,
				duration: 2.472,
				length: -39.155,
				rotate: -0.115,
				thickness: 21.575
			},
			{
				deg: 0.721,
				delay: 2.806,
				duration: 2.143,
				length: 34.744,
				rotate: 0.525,
				thickness: 18.076
			},
			{
				deg: 0.727,
				delay: 2.256,
				duration: 2.121,
				length: 11.277,
				rotate: 3.238,
				thickness: 12.495
			},
			{
				deg: 0.598,
				delay: 2.077,
				duration: 1.802,
				length: -20.595,
				rotate: -3.962,
				thickness: 29.726
			},
			{ deg: 0.543, delay: 2.447, duration: 2.286, length: 6.197, rotate: 3.714, thickness: 9.188 },
			{
				deg: 0.173,
				delay: 2.029,
				duration: 2.055,
				length: -28.878,
				rotate: 1.206,
				thickness: 21.113
			},
			{ deg: 0.253, delay: 2.8, duration: 1.244, length: -21.485, rotate: 1.47, thickness: 26.222 },
			{
				deg: 0.7,
				delay: 2.334,
				duration: 2.478,
				length: 22.175,
				rotate: -2.625,
				thickness: 10.778
			},
			{
				deg: 0.648,
				delay: 2.45,
				duration: 2.06,
				length: 47.062,
				rotate: -0.092,
				thickness: 24.202
			},
			{
				deg: 0.01,
				delay: 2.224,
				duration: 2.371,
				length: 43.616,
				rotate: -0.571,
				thickness: 16.046
			},
			{ deg: 0.926, delay: 2.12, duration: 1.41, length: 1.642, rotate: 2.064, thickness: 10.149 },
			{ deg: 0.15, delay: 2.089, duration: 1.543, length: 2.033, rotate: 1.492, thickness: 31.149 }
		],
		// Particle positions normalized from 2000×2000 SVG viewBox: [cx/2000, cy/2000]
		PARTICLES_SMALL: [number, number][] = [
			[0.0335, 0.1585],
			[0.1155, 0.091],
			[0.198, 0.249],
			[0.282, 0.021],
			[0.3605, 0.3955],
			[0.4475, 0.079],
			[0.521, 0.301],
			[0.6075, 0.6835],
			[0.6935, 0.4635],
			[0.771, 0.098],
			[0.071, 0.466],
			[0.1465, 0.7435],
			[0.216, 0.6335],
			[0.307, 0.4435],
			[0.3895, 0.7855],
			[0.469, 0.549],
			[0.538, 0.891],
			[0.632, 0.231],
			[0.716, 0.9215],
			[0.8125, 0.256],
			[0.041, 0.839],
			[0.9215, 0.3615],
			[0.206, 0.177],
			[0.7935, 0.856],
			[0.9715, 0.3365],
			[0.151, 0.873],
			[0.5435, 0.049],
			[0.977, 0.881],
			[0.0615, 0.6435],
			[0.931, 0.127],
			[0.888, 0.9315],
			[0.1535, 0.056],
			[0.736, 0.921],
			[0.299, 0.9585],
			[0.0835, 0.226],
			[0.9635, 0.663],
			[0.341, 0.7735],
			[0.6235, 0.3105],
			[0.2065, 0.8365],
			[0.796, 0.197],
			[0.8945, 0.516],
			[0.1215, 0.946],
			[0.4585, 0.1615],
			[0.786, 0.3985],
			[0.064, 0.8225],
			[0.4565, 0.7515],
			[0.8335, 0.118],
			[0.269, 0.556],
			[0.696, 0.481],
			[0.0285, 0.7035],
			[0.173, 0.377],
			[0.421, 0.2135],
			[0.578, 0.119],
			[0.8655, 0.262],
			[0.9145, 0.627],
			[0.2435, 0.716],
			[0.432, 0.877],
			[0.638, 0.756],
			[0.817, 0.5685],
			[0.1625, 0.339],
			[0.366, 0.127],
			[0.562, 0.418],
			[0.766, 0.739],
			[0.127, 0.6635],
			[0.2605, 0.3765],
			[0.489, 0.321],
			[0.677, 0.7735],
			[0.9115, 0.7735],
			[0.182, 0.9335],
			[0.391, 0.6215],
			[0.5715, 0.5785],
			[0.8285, 0.697],
			[0.0935, 0.2935],
			[0.2735, 0.118],
			[0.427, 0.4635],
			[0.6335, 0.392],
			[0.874, 0.337],
			[0.1365, 0.5215],
			[0.317, 0.827],
			[0.516, 0.673],
			[0.2325, 0.624],
			[0.493, 0.259],
			[0.7115, 0.088],
			[0.9465, 0.2105],
			[0.878, 0.7105],
			[0.266, 0.789],
			[0.3625, 0.932],
			[0.591, 0.8115],
			[0.7815, 0.5035],
			[0.109, 0.3925],
			[0.3245, 0.179],
			[0.5945, 0.366],
			[0.8365, 0.793],
			[0.188, 0.592],
			[0.238, 0.436],
			[0.5285, 0.2375],
			[0.656, 0.142],
			[0.862, 0.8615],
			[0.0915, 0.9715],
			[0.437, 0.6935]
		],
		PARTICLES_MEDIUM: [number, number][] = [
			[0.0835, 0.1085],
			[0.4155, 0.091],
			[0.198, 0.749],
			[0.782, 0.171],
			[0.1605, 0.4455],
			[0.9475, 0.379],
			[0.321, 0.051],
			[0.6075, 0.9335],
			[0.0435, 0.6635],
			[0.871, 0.098],
			[0.971, 0.766],
			[0.2965, 0.9935],
			[0.716, 0.6335],
			[0.107, 0.2935],
			[0.8895, 0.2855],
			[0.469, 0.899],
			[0.838, 0.391],
			[0.132, 0.731],
			[0.516, 0.6215],
			[0.9125, 0.206],
			[0.341, 0.839],
			[0.7215, 0.1615],
			[0.056, 0.477],
			[0.4935, 0.856],
			[0.6715, 0.0865],
			[0.251, 0.673],
			[0.8935, 0.449],
			[0.177, 0.981],
			[0.5615, 0.3435],
			[0.381, 0.627],
			[0.738, 0.9315],
			[0.1535, 0.056],
			[0.936, 0.771],
			[0.299, 0.4085],
			[0.7335, 0.226],
			[0.4635, 0.663],
			[0.091, 0.7735],
			[0.8235, 0.3105],
			[0.2065, 0.6365],
			[0.646, 0.197],
			[0.8945, 0.816],
			[0.1215, 0.696],
			[0.4585, 0.1115],
			[0.786, 0.8985],
			[0.264, 0.3225],
			[0.6565, 0.7515],
			[0.4335, 0.468],
			[0.569, 0.556],
			[0.196, 0.231],
			[0.8285, 0.5535]
		],
		PARTICLES_BIG: [number, number][] = [
			[0.0335, 0.1585],
			[0.1155, 0.191],
			[0.198, 0.149],
			[0.6935, 0.1635],
			[0.771, 0.198],
			[0.864, 0.142],
			[0.9465, 0.186],
			[0.216, 0.2835],
			[0.307, 0.2435],
			[0.3895, 0.2855],
			[0.469, 0.249],
			[0.538, 0.291],
			[0.632, 0.231],
			[0.716, 0.2715],
			[0.041, 0.339],
			[0.1215, 0.3615],
			[0.206, 0.327],
			[0.3715, 0.3365],
			[0.451, 0.373],
			[0.781, 0.377],
			[0.867, 0.339],
			[0.9395, 0.371],
			[0.2155, 0.446],
			[0.299, 0.417],
			[0.3835, 0.4485],
			[0.4635, 0.4205],
			[0.541, 0.456],
			[0.6235, 0.4265],
			[0.7065, 0.4615],
			[0.0445, 0.516],
			[0.1215, 0.546],
			[0.2085, 0.5115],
			[0.286, 0.5485],
			[0.5335, 0.518],
			[0.619, 0.556],
			[0.863, 0.5215],
			[0.946, 0.559],
			[0.052, 0.6185],
			[0.1335, 0.599],
			[0.216, 0.6325],
			[0.469, 0.6015],
			[0.546, 0.6415],
			[0.628, 0.617],
			[0.7065, 0.6465],
			[0.788, 0.6115],
			[0.2865, 0.731],
			[0.364, 0.6975],
			[0.448, 0.736],
			[0.5265, 0.703],
			[0.613, 0.7405],
			[0.696, 0.707],
			[0.7835, 0.746],
			[0.056, 0.7985],
			[0.139, 0.7715],
			[0.5435, 0.8225],
			[0.6265, 0.7935],
			[0.8715, 0.8235],
			[0.9565, 0.7965],
			[0.0445, 0.8815],
			[0.377, 0.896],
			[0.456, 0.868],
			[0.706, 0.9065],
			[0.7935, 0.8765],
			[0.0615, 0.9485],
			[0.139, 0.921],
			[0.5465, 0.9765],
			[0.627, 0.946],
			[0.713, 0.9835],
			[0.9555, 0.9615]
		],
		PARTICLE_LAYERS = [
			{ cycleSecs: 30, particles: PARTICLES_SMALL, radius: 1.5 },
			{ cycleSecs: 40, particles: PARTICLES_MEDIUM, radius: 2.5 },
			{ cycleSecs: 55, particles: PARTICLES_BIG, radius: 4 }
		],
		TAU = Math.PI * 2,
		DEG_RANGE_RAD = 72.5 * (Math.PI / 180),
		DEG_TO_RAD = Math.PI / 180

	function easeInOut(time: number): number {
		return time < 0.5 ? 4 * time * time * time : 1 - (-2 * time + 2) ** 3 / 2
	}

	function triangleWave(phase: number): number {
		return phase < 0.5 ? phase * 2 : 2 - phase * 2
	}

	function frame(timestamp: number) {
		if (!canvas) {
			return
		}

		rafId = requestAnimationFrame(frame)

		if (lastTimestamp !== undefined) {
			elapsed += (timestamp - lastTimestamp) / 1000
		}
		lastTimestamp = timestamp

		if (canvasW === 0 || canvasH === 0) {
			return
		}

		// Step 1: Background
		context.fillStyle = bgGradient!
		context.fillRect(0, 0, canvasW, canvasH)

		// Step 2: Rays onto offscreen canvas, accumulated with screen blending
		offContext.clearRect(0, 0, canvasW, canvasH)
		offContext.globalCompositeOperation = 'screen'

		for (const ray of RAY_OPTIONS) {
			const shimmerPhase = ((elapsed + ray.delay) % ray.duration) / ray.duration,
				opacity = 0.33 - triangleWave(shimmerPhase) * (0.33 - 0.03),
				rotateDuration = ray.duration * Math.PI,
				rotatePhase = ((elapsed + ray.delay) % rotateDuration) / rotateDuration,
				rotOffsetRad = easeInOut(triangleWave(rotatePhase)) * (ray.rotate * DEG_TO_RAD),
				anchorX = canvasW * (0.7 - 0.4 * ray.deg),
				baseAngle = (ray.deg - 0.5) * DEG_RANGE_RAD,
				rayHeight = canvasH * 0.2 + 370 * dpr + ray.length * dpr,
				rayWidth = ray.thickness * dpr,
				rayGradient = offContext.createLinearGradient(0, 0, 0, rayHeight)
			rayGradient.addColorStop(0, 'rgba(166,255,248,1)')
			rayGradient.addColorStop(1, 'rgba(166,255,248,0)')

			offContext.save()
			offContext.globalAlpha = opacity
			offContext.fillStyle = rayGradient
			offContext.translate(anchorX, -100 * dpr)
			offContext.rotate(baseAngle + rotOffsetRad)
			offContext.fillRect(-rayWidth / 2, 0, rayWidth, rayHeight)
			offContext.restore()
		}

		// Composite blurred rays onto main canvas
		context.save()
		context.filter = blurString
		context.drawImage(offscreen, 0, 0)
		context.restore()

		// Step 3: Particles scrolling upward (seamless two-copy loop)
		context.fillStyle = 'white'

		for (const layer of PARTICLE_LAYERS) {
			const scrollPx = ((elapsed % layer.cycleSecs) / layer.cycleSecs) * canvasH,
				radiusPx = (layer.radius * canvasW) / 2000

			for (const [normalizedX, normalizedY] of layer.particles) {
				const x = normalizedX * canvasW,
					y = normalizedY * canvasH - scrollPx

				context.beginPath()
				context.arc(x, y, radiusPx, 0, TAU)
				context.fill()

				context.beginPath()
				context.arc(x, y + canvasH, radiusPx, 0, TAU)
				context.fill()
			}
		}

		// Step 4: Vignette
		context.fillStyle = vignetteGradient!
		context.fillRect(0, 0, canvasW, canvasH)
	}

	function resize() {
		dpr = window.devicePixelRatio || 1
		const rect = canvas!.getBoundingClientRect()
		canvasW = Math.round(rect.width * dpr)
		canvasH = Math.round(rect.height * dpr)
		canvas!.width = canvasW
		canvas!.height = canvasH

		offscreen = new OffscreenCanvas(canvasW, canvasH)
		offContext = offscreen.getContext('2d')!

		blurString = `blur(${9.6 * dpr}px)`

		const farthestCornerDistance = Math.hypot(canvasW / 2, canvasH)
		bgGradient = context.createRadialGradient(
			canvasW / 2,
			0,
			0,
			canvasW / 2,
			0,
			farthestCornerDistance
		)
		bgGradient.addColorStop(0, '#23617d')
		bgGradient.addColorStop(0.85, '#112031')
		bgGradient.addColorStop(1, '#112031')

		const vignetteRadius = Math.max(canvasW, canvasH) * 0.85
		vignetteGradient = context.createRadialGradient(
			canvasW / 2,
			canvasH / 2,
			0,
			canvasW / 2,
			canvasH / 2,
			vignetteRadius
		)
		vignetteGradient.addColorStop(0, 'rgba(0,0,0,0)')
		vignetteGradient.addColorStop(1, '#112031')
	}

	let bgGradient: CanvasGradient | undefined,
		blurString = 'blur(9.6px)',
		canvasH = 0,
		canvasW = 0,
		dpr = 1,
		elapsed = 0,
		lastTimestamp: number | undefined,
		rafId: number,
		resizeObserver: ResizeObserver,
		vignetteGradient: CanvasGradient | undefined

	onMount(() => {
		canvas = document.querySelector('#ocean-background') as HTMLCanvasElement
		context = canvas.getContext('2d')!
		offscreen = new OffscreenCanvas(1, 1)
		offContext = offscreen.getContext('2d')!

		resizeObserver = new ResizeObserver(resize)
		resizeObserver.observe(canvas!)
		resize()

		rafId = requestAnimationFrame(frame)

		console.log('Ocean background loaded')

		return () => {
			cancelAnimationFrame(rafId)
			resizeObserver.disconnect()
		}
	})
</script>

<canvas id="ocean-background" aria-hidden="true" class="block h-full w-full bg-neutral-950"
></canvas>
