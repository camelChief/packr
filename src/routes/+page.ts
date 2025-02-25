import { redirect } from '@sveltejs/kit';

export function load() {
	let isFirstVisit = !localStorage.getItem('visited');
	if (isFirstVisit) redirect(303, '/new');
}
