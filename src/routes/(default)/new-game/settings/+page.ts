import { ActionType, type PageData } from '$lib/models/page-data';
import { Swords } from 'lucide-svelte';

export function load(): PageData {
    return {
        title: 'Game Settings',
        breadcrumbs: ['New Game'],
        useBackButton: true,
        backButtonUrl: '/new-game/roles',
        actions: [
            {
                type: ActionType.Button,
                reference: 'nextPage',
                icon: Swords,
                class: 'btn-primary',
            }
        ]
    };
}
