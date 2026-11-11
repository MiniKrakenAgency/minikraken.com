import type { Config } from 'release-it'

export default {
	git: {
		commit: true,
		commitMessage: 'Release v${version}',
		push: true,
		tag: true,
		tagName: 'v${version}'
	},
	github: {
		autoGenerate: true,
		makeLatest: true,
		release: true,
		releaseName: 'v${version}'
	},
	npm: {
		publish: false
	},
	plugins: {
		'@j-ulrich/release-it-regex-bumper': {
			out: [
				{
					file: '.deployment/app/deployment.yaml',
					replace: 'v{{versionWithoutPrerelease}}',
					search: String.raw`v\d+\.\d+\.\d+`
				}
			]
		},
		'@release-it/conventional-changelog': {
			infile: 'CHANGELOG.md',
			preset: {
				name: 'angular'
			}
		}
	}
} satisfies Config
