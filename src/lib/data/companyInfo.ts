import { m } from '$paraglide/messages'

export const companyInfo = {
	address: 'Dendermondse Steenweg',
	city: 'Aalst',
	country: m.country(),
	houseNumber: '56',
	mapsLink: 'https://maps.app.goo.gl/BtRbAd5hkE45VhqA8',
	phone: '+32 474 77 35 67',
	postalCode: '9300'
} as const

export default companyInfo
