import { base } from '$app/paths';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	let isFirstVisit = !localStorage.getItem('visited');
	if (isFirstVisit) redirect(303, `${base}/new`);
}
