import { ActionType, type PageData } from '$lib/models/page-data';
import { ArrowRight, House } from 'lucide-svelte';

export function load(): PageData {
	return {
		title: 'Select Players',
		breadcrumbs: ['New Game'],
		useBackButton: true,
		backButtonUrl: '/',
		backButtonIcon: House,
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
}
