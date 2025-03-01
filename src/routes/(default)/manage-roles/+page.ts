import type { PageData } from '$lib/models/page-data';

export function load(): PageData {
	return {
		title: 'Manage Roles',
		useBackButton: true,
		backButtonUrl: '/'
	};
}
