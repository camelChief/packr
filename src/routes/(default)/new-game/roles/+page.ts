import { base } from '$app/paths';
import { ActionType, type PageData } from '$lib/models/page-data';
import { draftGameStore } from '$lib/stores';
import { redirect } from '@sveltejs/kit';
import { ArrowRight } from 'lucide-svelte';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	const draftGame = get(draftGameStore);
	if (!draftGame || !draftGame.players.length) redirect(302, `${base}/`);
	
	const pageData: PageData = {
		title: 'Select Roles',
		breadcrumbs: ['New Game'],
		useBackButton: true,
		backButtonUrl: `${base}/new-game/players`,
		actions: [
			{
				type: ActionType.Button,
				reference: 'nextPage',
				icon: ArrowRight,
				class: 'btn-primary'
			}
		]
	};

	return pageData;
}
