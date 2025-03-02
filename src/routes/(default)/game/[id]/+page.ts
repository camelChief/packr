import { base } from '$app/paths';
import type { GamePageData } from '$lib/models/page-data';
import { House } from 'lucide-svelte';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const pageData: GamePageData = {
		id: params.id,
		title: `Game: ${params.id}`,
		useBackButton: true,
		backButtonUrl: `${base}/`,
		backButtonIcon: House
	}

	return pageData;
};
