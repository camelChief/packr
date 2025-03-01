import { ActionType, type PageData } from '$lib/models/page-data';
import { ArrowRight } from 'lucide-svelte';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	const pageData: PageData = {
		title: 'Select Players',
		breadcrumbs: ['New Game'],
		useBackButton: true,
		backButtonUrl: '/',
		actions: [
			{
				type: ActionType.Button,
				reference: 'nextPage',
				icon: ArrowRight,
				class: 'btn-primary',
				validIf: 'validPlayerCount'
			}
		]
	};

	return pageData;
};
