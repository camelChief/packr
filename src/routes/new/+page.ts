import { base } from '$app/paths';
import { redirect } from '@sveltejs/kit';

export function load() {
	let isFirstVisit = !localStorage.getItem('visited');
	if (isFirstVisit) localStorage.setItem('visited', 'true');
	else redirect(303, `/${base}`);
}
