import { base } from '$app/paths';
import { ActionType, type PageData } from '$lib/models/page-data';
import { Plus } from 'lucide-svelte';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	const pageData: PageData = {
		title: 'Manage Players',
		useBackButton: true,
		backButtonUrl: `${base}`,
		actions: [
			{
				type: ActionType.Button,
				reference: 'openAddPlayerModal',
				icon: Plus,
				class: 'btn-success'
			}
		]
	};

	return pageData;
};
