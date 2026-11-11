import path from 'node:path'
import { includeIgnoreFile } from '@eslint/compat'
import js from '@eslint/js'
import svelte from 'eslint-plugin-svelte'
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import ts from 'typescript-eslint'
import svelteConfig from './svelte.config.js'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'

const gitignorePath = path.resolve(import.meta.dirname, '.gitignore')

export default defineConfig(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	ts.configs.recommended,
	eslintPluginUnicorn.configs.recommended,
	svelte.configs.recommended,
	{
		rules: {
			'unicorn/filename-case': [
				'error',
				{
					cases: {
						camelCase: true,
						kebabCase: true,
						pascalCase: true
					}
				}
			],
			'unicorn/no-top-level-assignment-in-function': 'warn',
			'unicorn/name-replacements': [
				'error',
				{
					replacements: {
						props: false
					}
				}
			],
			'unicorn/no-abusive-eslint-disable': 'warn',
			'svelte/no-navigation-without-resolve': 'warn',
			'svelte/require-each-key': 'warn'
		}
	},
	{
		languageOptions: { globals: { ...globals.browser, ...globals.node } },
		rules: {
			// typescript-eslint strongly recommend that you do not use the no-undef lint rule on TypeScript projects.
			// see: https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
			'no-undef': 'off'
		}
	},
	{
		files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
		languageOptions: {
			parserOptions: {
				projectService: true,
				extraFileExtensions: ['.svelte'],
				parser: ts.parser,
				svelteConfig
			}
		},
		rules: {
			'prefer-const': 'warn'
		}
	}
)
