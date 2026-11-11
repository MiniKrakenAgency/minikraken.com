type AnyFunction = (...arguments_: never[]) => unknown

const isPromise = (value: unknown): value is Promise<unknown> => value instanceof Promise

export function measure<T extends AnyFunction>(function_: T): T
export function measure<T extends AnyFunction>(message: string, function_: T): T
export function measure<T extends AnyFunction>(messageOrFunction: string | T, function_?: T): T {
	const message = typeof messageOrFunction === 'string' ? messageOrFunction : '',
		measuredFunction = typeof messageOrFunction === 'function' ? messageOrFunction : function_!

	return ((...arguments_: Parameters<T>): ReturnType<T> => {
		const start = performance.now()

		try {
			const result = measuredFunction(...arguments_)

			if (isPromise(result)) {
				// eslint-disable-next-line unicorn/prefer-await
				return result.finally(() => {
					console.log(
						`${message ? `${message}: ` : ''}Execution time: ${performance.now() - start}ms`
					)
				}) as ReturnType<T>
			}

			console.log(`${message ? `${message}: ` : ''}Execution time: ${performance.now() - start}ms`)
			return result as ReturnType<T>
		} catch (error) {
			console.log(`${message ? `${message}: ` : ''}Execution time: ${performance.now() - start}ms`)
			throw error
		}
	}) as T
}
