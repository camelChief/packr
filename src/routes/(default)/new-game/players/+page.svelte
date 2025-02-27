<script lang="ts">
	import { goto } from '$app/navigation';
	import { Game, Status } from '$lib/models/game';
	import { createGame, getGames, updateGame } from '$lib/services/game-service';
	import { getPlayers } from '$lib/services/player-service';
	import { eventStore, validationStore } from '$lib/stores';
	import { Square, SquareCheck, SquareDot, UserSquare } from 'lucide-svelte';
	import { onDestroy, onMount } from 'svelte';
	import type { Unsubscriber } from 'svelte/store';

	let players: string[] = [];
	let selectedPlayers: string[] = [];
	let unsubscribeFromEvents: Unsubscriber;

	function subscribeToEvents() {
		unsubscribeFromEvents = eventStore.subscribe(async (event) => {
			if (event === 'nextPage') {
				eventStore.set('');

				// todo: fix this up to use a store to manage
				// drafting a game across multiple pages
				const games = await getGames();
				const draftGame = games.find((game) => game.status === Status.Draft);
				if (draftGame) {
					draftGame.players = selectedPlayers;
					await updateGame(draftGame);
				} else {
					// create new game
					const id = new Date().getTime();
					const game = new Game(id, selectedPlayers);
					await createGame(game);
				}

				// navigate to next page
				goto('/new-game/roles');
			}
		});
	}

	// todo: fix this up to use a store
	async function populateNames() {
		players = await getPlayers();
		const games = await getGames();
		const draftGame = games.find((game) => game.status === Status.Draft);
		selectedPlayers = draftGame?.players ?? [];
	}

	function selectAll() {
		if (selectedPlayers.length > 0) selectedPlayers = [];
		else selectedPlayers = players;
		validate();
	}

	function select(player: string) {
		if (!selectedPlayers.includes(player)) {
			selectedPlayers = selectedPlayers.filter((p) => p !== player);
		} else {
			selectedPlayers = [...selectedPlayers, player];
		}
		validate();
	}

	function validate() {
		const count = selectedPlayers.length;
		if (count < 7 || count > 35) {
			validationStore.update((v) => {
				return v.filter((v) => v !== 'validPlayerCount');
			});
		} else {
			validationStore.update((v) => {
				if (v.includes('validPlayerCount')) return v;
				return [...v, 'validPlayerCount'];
			});
		}
	}

	onMount(async () => {
		subscribeToEvents();
		await populateNames();
		validate();
	});

	onDestroy(() => unsubscribeFromEvents());

	// continue: from here
	// have dealt with all ts, need to comb through html
	// continue through standard flow of app to create game
</script>

{#if players?.length}
	<p class="mb-8">
		Select at least 7 and at most 35 players to be involved in this
		game of Werewolf.
	</p>
	<ul class="list rounded-box border-1 border-base-content/10">
		<button onclick={selectAll} class="p-4 flex items-center gap-4 font-bold">
			{#if selectedPlayers.length === players.length}
				<SquareCheck />
			{:else if selectedPlayers.length > 0}
				<div class="opacity-50">
					<SquareDot />
				</div>
			{:else}
				<div class="opacity-25">
					<Square />
				</div>
			{/if}
			{selectedPlayers.length} selected
		</button>
		{#each players as name}
			<button onclick={() => select(name)} class="list-row">
				{#if selectedPlayers.includes(name)}
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
