import type { PageData } from '$lib/models/page-data';

export function load(): PageData {
	return {
		title: 'Settings',
		useBackButton: true,
		backButtonUrl: '/'
	};
}
