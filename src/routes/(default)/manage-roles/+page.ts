import type { PageData } from '$lib/models/page-data';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	const pageData: PageData = {
		title: 'Manage Roles',
		useBackButton: true,
		backButtonUrl: '/'
	};

	return pageData;
}
