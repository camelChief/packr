<script lang="ts">
	import { goto } from '$app/navigation';
	import { SETTINGS } from '$lib/constants';
	import type { Setting } from '$lib/models/setting';
	import { eventStore } from '$lib/stores';
	import { onDestroy, onMount } from 'svelte';
	import type { Unsubscriber } from 'svelte/store';

	interface EditableSetting extends Setting {
		value: boolean | number | string;
	}

	let unsubscribeFromEvents: Unsubscriber;
	let settings: EditableSetting[] = $state([]);

	function subscribeToEvents() {
		unsubscribeFromEvents = eventStore.subscribe(async (event) => {
			if (event === 'nextPage') {
				eventStore.set('');

				// const games = await getGames();
				// const draftGame = games.find((game) => game.status === Status.Draft);
				// if (draftGame) {
				// 	draftGame.players = selectedNames;
				// 	await updateGame(draftGame);
				// } else {
				// 	// create new game
				// 	const id = new Date().getTime();
				// 	const game = new Game(id, selectedNames);
				// 	await createGame(game);
				// }

				// navigate to next page
				goto('/game/1');
			}
		});
	}

	function populateSettings() {
		settings = SETTINGS.map((setting) => ({ ...setting, value: setting.default }));
	}

	onMount(() => {
		subscribeToEvents();
		populateSettings();
	});

	onDestroy(() => unsubscribeFromEvents());
</script>

<main>
	<p class="mb-8">Apply settings here which will only affect the current game.</p>

	<ul class="list">
		{#each settings as setting}
			<li class="list-row items-center">
				{#if setting.type === 'boolean'}
					<!-- <div class="w-12"> -->
					<input type="checkbox" checked={setting.value as boolean} class="toggle" />
					<!-- </div> -->
				{:else if setting.type === 'number'}
					<input type="number" value={setting.value as number} class="input w-10" />
				{/if}
				<div>
					<div>{setting.label}</div>
					<div class="text-base-content/50 text-base">{setting.description}</div>
				</div>
			</li>
		{/each}
	</ul>
</main>
