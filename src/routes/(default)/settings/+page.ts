import { base } from '$app/paths';
import type { PageData } from '$lib/models/page-data';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	const pageData: PageData = {
		title: 'Settings',
		useBackButton: true,
		backButtonUrl: `/${base}`
	};

	return pageData;
}
