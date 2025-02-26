import { ActionType, type PageData } from '$lib/models/page-data';
import { ArrowRight } from 'lucide-svelte';

export function load(): PageData {
	return {
		title: 'Select Roles',
		breadcrumbs: ['New Game'],
		useBackButton: true,
		backButtonUrl: '/new-game/players',
		actions: [
			{
				type: ActionType.Button,
				reference: 'nextPage',
				icon: ArrowRight,
				class: 'btn-primary',
			}
		]
	};
}
