import { base } from '$app/paths';
import { ActionType, type PageData } from '$lib/models/page-data';
import { draftGameStore } from '$lib/stores';
import { redirect } from '@sveltejs/kit';
import { Swords } from 'lucide-svelte';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	const draftGame = get(draftGameStore);
	if (!draftGame || !draftGame.players.length) redirect(302, `${base}/`);
	
	const pageData: PageData = {
		title: 'Game Settings',
		breadcrumbs: ['New Game'],
		useBackButton: true,
		backButtonUrl: `${base}/new-game/roles`,
		actions: [
			{
				type: ActionType.Button,
				reference: 'startGame',
				icon: Swords,
				class: 'btn-primary'
			}
		]
	};

	return pageData;
}
