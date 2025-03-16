<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { Game, GameStatus } from '$lib/models/game';
	import { createGame, deleteGame, getGames } from '$lib/services/game-service';
	import { draftGameStore } from '$lib/stores';
	import { ArrowLeft, Drama, Package, Plus, Settings, Swords, Users } from 'lucide-svelte';
	import { onMount } from 'svelte';

	let incompleteGame: Game | undefined;
	let gameInProgress = false;

	async function createNewGame() {
		if (incompleteGame) await deleteGame(incompleteGame.id);
		const newGame = new Game({});
		await createGame(newGame);
		draftGameStore.set(newGame);
		goto(`${base}/new-game/players`);
	}

	async function editDraftGame() {
		if (!incompleteGame) {
			goto(`${base}/new-game/players`);
			return;
		}

		const playerCount = incompleteGame.players.length;
		const missingRoles = incompleteGame.players.some((p) => !p.role);

		if (playerCount < 7 || playerCount > 35) goto(`${base}/new-game/players`);
		else if (missingRoles) goto(`${base}/new-game/roles`);
		else if (!incompleteGame.settings.length) goto(`${base}/new-game/settings`);
	}

	onMount(async () => {
		const games = await getGames();
		incompleteGame = games.find((g) => g.status !== GameStatus.Complete);
		gameInProgress = incompleteGame?.status === GameStatus.InProgress;
	});
</script>

<main class="column">
	<h3 class="logo">
		<Package strokeWidth={2.5} />
		Packr
	</h3>
	{#if gameInProgress}
		<a href="{base}/game/{incompleteGame?.id}" class="btn btn-primary">
			<Swords size={20} />
			Continue
		</a>
	{/if}
	<button onclick={() => {
		if (gameInProgress) inProgressGameModal.showModal();
		else if (incompleteGame?.players?.length) draftGameModal.showModal();
		else createNewGame();
	}} class="btn btn-primary">
		<Plus size={20} />
		New Game
	</button>
	<a href="{base}/manage-players" class="btn">
		<Users size={20} />
		Manage Players
	</a>
	<a href="{base}/manage-roles" class="btn">
		<Drama size={20} />
		Manage Roles
	</a>
	<a href="{base}/settings" class="btn">
		<Settings size={20} />
		Settings
	</a>
</main>

<dialog id="inProgressGameModal" class="modal">
	<div class="modal-box p-8">
		<h3 class="mb-4">Game In Progress</h3>
		<p>
			It looks like you are in the middle of another game. Creating a new
			game will discard the current one. Would you like to continue?
		</p>
		<div class="modal-action">
			<form method="dialog">
				<button class="btn btn-square">
					<ArrowLeft size={20} />
				</button>
			</form>

			<button onclick={createNewGame} class="btn btn-primary">Continue</button>
		</div>
	</div>
</dialog>

<dialog id="draftGameModal" class="modal">
	<div class="modal-box p-8">
		<h3 class="mb-4">Draft Game</h3>
		<p>
			It looks like you were in the middle of setting up a game. Would you like to continue with
			your draft or discard and start a new game?
		</p>
		<div class="modal-action">
			<form method="dialog">
				<button class="btn btn-square">
					<ArrowLeft size={20} />
				</button>
			</form>

			<button onclick={createNewGame} class="btn btn-secondary">New</button>
			<button onclick={editDraftGame} class="btn btn-primary">Draft</button>
		</div>
	</div>
</dialog>

<style>
	main {
		align-items: center;
		gap: 1rem;
		justify-content: center;
		padding: 2rem;
	}

	.logo {
		align-items: center;
		display: flex;
		gap: 0.5rem;
		left: 2rem;
		position: absolute;
		top: 2rem;
	}
</style>
