import { base } from '$app/paths';
import { ActionType, type PageData } from '$lib/models/page-data';
import { Swords } from 'lucide-svelte';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	const pageData: PageData = {
		title: 'Game Settings',
		breadcrumbs: ['New Game'],
		useBackButton: true,
		backButtonUrl: `/${base}/new-game/roles`,
		actions: [
			{
				type: ActionType.Button,
				reference: 'nextPage',
				icon: Swords,
				class: 'btn-primary'
			}
		]
	};

	return pageData;
}
