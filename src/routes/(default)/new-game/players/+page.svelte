<script lang="ts">
	import { goto } from '$app/navigation';
	import { Game, Status } from '$lib/models/game';
	import { createGame, getGames, updateGame } from '$lib/services/game-service';
	import { getPlayers } from '$lib/services/player-service';
	import { eventStore, validationStore } from '$lib/stores';
	import { Square, SquareCheck, SquareDot, SquareMinus, UserSquare } from 'lucide-svelte';
	import { onDestroy, onMount } from 'svelte';
	import type { Unsubscriber } from 'svelte/store';

	let names: string[] = [];
	let selectedNames: string[] = [];
	let unsubscribeFromEvents: Unsubscriber;

	function selectAll() {
		if (selectedNames.length > 0) selectedNames = [];
		else selectedNames = names;
		validate();
	}

	function select(name: string) {
		if (selectedNames.includes(name)) selectedNames = selectedNames.filter((s) => s !== name);
		else selectedNames = [...selectedNames, name];
		validate();
	}

	function validate() {
		const count = selectedNames.length;
		if (count < 7 || count > 35) {
			validationStore.update((v) => v.filter((v) => v !== 'validPlayerCount'));
		} else {
			validationStore.update((v) => {
				if (v.includes('validPlayerCount')) return v;
				return [...v, 'validPlayerCount'];
			});
		}
	}

	function subscribeToEvents() {
		unsubscribeFromEvents = eventStore.subscribe(async (event) => {
			if (event === 'nextPage') {
				eventStore.set('');

				const games = await getGames();
				const draftGame = games.find((game) => game.status === Status.Draft);
				if (draftGame) {
					draftGame.players = selectedNames;
					await updateGame(draftGame);
				} else {
					// create new game
					const id = new Date().getTime();
					const game = new Game(id, selectedNames);
					await createGame(game);
				}

				// navigate to next page
				goto('/new-game/roles');
			}
		});
	}

	async function populateNames() {
		const players = await getPlayers();
		names = players.map((player) => player.name);
		const games = await getGames();
		const draftGame = games.find((game) => game.status === Status.Draft);
		selectedNames = draftGame?.players ?? [];
	}

	onMount(async () => {
		subscribeToEvents();
		await populateNames();
		validate();
	});

	onDestroy(() => unsubscribeFromEvents());
</script>

{#if names?.length}
	<p class="mb-8">
		Select at least 7 and at most 35 players to be involved in this
		game of Werewolf.
	</p>
	<ul class="list rounded-box border-1 border-base-content/10">
		<button onclick={selectAll} class="p-4 flex items-center gap-4 font-bold">
			{#if selectedNames.length === names.length}
				<SquareCheck />
			{:else if selectedNames.length > 0}
				<div class="opacity-50">
					<SquareDot />
				</div>
			{:else}
				<div class="opacity-25">
					<Square />
				</div>
			{/if}
			{selectedNames.length} selected
		</button>
		{#each names as name}
			<button onclick={() => select(name)} class="list-row">
				{#if selectedNames.includes(name)}
					<UserSquare />
					{name}
				{:else}
					<div class="opacity-25">
						<Square />
					</div>
					<span class="opacity-25">{name}</span>	
				{/if}
			</button>
		{/each}
	</ul>
{:else}
	<!-- todo: upgrade this with an image :) -->
	<div class="empty">
		<p class="text-center">
			No players found!
			<br />Add players from the
			<a href="/manage-players" class="link">Manage Players</a>
			screen.
		</p>
	</div>
{/if}

<style>
	.list-row {
		align-items: center;
		text-align: left;
	}

	.empty {
		align-items: center;
		display: flex;
		height: 100%;
	}
</style>
