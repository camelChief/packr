<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { Game } from '$lib/models/game';
	import { updateGame } from '$lib/services/game-service';
	import { createPlayer, getPlayers } from '$lib/services/player-service';
	import { draftGameStore, eventStore, validationStore } from '$lib/stores';
	import { ArrowLeft, Plus, Square, SquareCheck, SquareDot, UserSquare } from 'lucide-svelte';
	import { onDestroy, onMount } from 'svelte';
	import { get, type Unsubscriber } from 'svelte/store';

	let draftGame: Game;
	let players: string[] = [];
	let selectedPlayers: string[] = [];
	let newPlayer = '';
	let unsubscribeFromEvents: Unsubscriber;

	function subscribeToEvents() {
		unsubscribeFromEvents = eventStore.subscribe(async (event) => {
			eventStore.set('');

			if (event === 'openAddPlayerModal') {
				addPlayerModal.showModal();
			} else if (event === 'nextPage') {
				draftGame.players = selectedPlayers.map((p) => ({ player: p }));
				await updateGame(draftGame);
				draftGameStore.set(draftGame);
				goto(`${base}/new-game/roles`);
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
	
	async function closeModal() {
		newPlayer = '';
		addPlayerModal.close();
	}

	async function addPlayer() {
		await createPlayer(newPlayer);
		players = [...players, newPlayer].sort();
		newPlayer = '';
		addPlayerModal.close();
	}

	onMount(async () => {
		const game = get(draftGameStore);
		if (game) draftGame = game;
		else return goto(`${base}/`);

		players = await getPlayers();
		selectedPlayers = draftGame.players.map((p) => p.player);
		subscribeToEvents();
		validate();
	});

	onDestroy(() => unsubscribeFromEvents());
</script>

{#if players?.length}
	<p class="mb-8">
		Select at least 7 and at most 35 players to be involved in this game of Werewolf. Use the + button below to add players.
	</p>
	<ul class="list rounded-box border-base-content/10 border-1">
		<button onclick={selectAll} class="list-row select-all">
			{#if selectedPlayers.length === players.length}
				<SquareCheck size={20} />
			{:else if selectedPlayers.length > 0}
				<div class="opacity-50">
					<SquareDot size={20} />
				</div>
			{:else}
				<div class="opacity-25">
					<Square size={20} />
				</div>
			{/if}
			{selectedPlayers.length} selected
		</button>
		{#each players as player}
			<button onclick={() => select(player)} class="list-row">
				{#if selectedPlayers.includes(player)}
					<UserSquare size={20} />
					{player}
				{:else}
					<div class="opacity-25">
						<Square size={20} />
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
			<br />Use the + button below to add players, or manage players from the
			<a href="{base}/manage-players" class="link">Manage Players</a>
			screen.
		</p>
	</div>
{/if}

<!-- todo: make modal display without hiding behind text -->
<!-- and without needing to set it to modal-top -->
<dialog id="addPlayerModal" class="modal">
	<div class="modal-box p-8">
		<h3>Add Player</h3>
		<label class="floating-label my-8">
			<span>Name</span>
			<input type="text" placeholder="Name" bind:value={newPlayer} class="input w-full" />
		</label>
		<div class="modal-action">
			<button onclick={closeModal} class="btn btn-square">
				<ArrowLeft size={20} />
			</button>
			<button onclick={addPlayer} class="btn btn-square btn-success">
				<Plus size={20} />
			</button>
		</div>
	</div>
</dialog>

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
