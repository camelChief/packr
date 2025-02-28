<script lang="ts">
	import { goto } from '$app/navigation';
	import { Game } from '$lib/models/game';
	import { updateGame } from '$lib/services/game-service';
	import { getPlayers } from '$lib/services/player-service';
	import { draftGameStore, eventStore, validationStore } from '$lib/stores';
	import { Square, SquareCheck, SquareDot, UserSquare } from 'lucide-svelte';
	import { onDestroy, onMount } from 'svelte';
	import { get, type Unsubscriber } from 'svelte/store';

	let draftGame: Game;
	let players: string[] = [];
	let selectedPlayers: string[] = [];
	let unsubscribeFromEvents: Unsubscriber;

	function subscribeToEvents() {
		unsubscribeFromEvents = eventStore.subscribe(async (event) => {
			if (event === 'nextPage') {
				eventStore.set('');
				draftGame.players = selectedPlayers.map((p) => ({ player: p }));
				await updateGame(draftGame);
				draftGameStore.set(draftGame);
				goto('/new-game/roles');
			}
		});
	}

	function selectAll() {
		if (selectedPlayers.length > 0) selectedPlayers = [];
		else selectedPlayers = players;
		validate();
	}

	function select(player: string) {
		if (selectedPlayers.includes(player)) {
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
		const game = get(draftGameStore);
		if (game) draftGame = game;
		else return goto('/');

		players = await getPlayers();
		selectedPlayers = draftGame.players.map((p) => p.player);
		subscribeToEvents();
		validate();
	});

	onDestroy(() => unsubscribeFromEvents());
</script>

{#if players?.length}
	<p class="mb-8">
		Select at least 7 and at most 35 players to be involved in this game of Werewolf.
	</p>
	<ul class="list rounded-box border-base-content/10 border-1">
		<button onclick={selectAll} class="list-row select-all">
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
		{#each players as player}
			<button onclick={() => select(player)} class="list-row">
				{#if selectedPlayers.includes(player)}
					<UserSquare />
					{player}
				{:else}
					<div class="opacity-25">
						<Square />
					</div>
					<span class="opacity-25">{player}</span>
				{/if}
			</button>
		{/each}
	</ul>
{:else}
	<!-- todo: upgrade this with an image -->
	<div class="no-players">
		<p class="text-center">
			No players found!
			<br />Add players from the
			<a href="/manage-players" class="link">Manage Players</a>
			screen.
		</p>
	</div>
{/if}

<style>
	button.list-row {
		align-items: center;
		text-align: left;
	}

	.select-all {
		column-gap: 1rem;
		font-weight: bold;
		padding: 1rem;
	}

	.no-players {
		align-items: center;
		display: flex;
		height: 100%;
	}
</style>
