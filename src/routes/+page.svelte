<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { Game, GameStatus } from '$lib/models/game';
	import { createGame, deleteGame, getGames } from '$lib/services/game-service';
	import { draftGameStore } from '$lib/stores';
	import { ArrowLeft, Drama, Gitlab, Settings, Swords, Users } from 'lucide-svelte';

	let draftGame: Game | null = null;

	async function newGame() {
		const draftGame = await getDraftGame();
		if (draftGame?.players?.length) draftGameModal.showModal();
		else createNewGame();
	}

	async function editDraftGame() {
		const draftGame = await getDraftGame();
		if (!draftGame) {
			goto(`/${base}/new-game`);
			return;
		}

		const playerCount = draftGame.players.length;
		const missingRoles = draftGame.players.some((p) => !p.role);

		if (playerCount < 7 || playerCount > 35) goto(`/${base}/new-game/players`);
		else if (missingRoles) goto(`/${base}/new-game/roles`);
		else if (!draftGame.settings.length) goto(`/${base}/new-game/settings`);
	}

	async function createNewGame() {
		const draftGame = await getDraftGame();
		if (draftGame) await deleteGame(draftGame.id);
		const newGame = new Game({});
		await createGame(newGame);
		draftGameStore.set(newGame);
		goto(`/${base}/new-game`);
	}

	async function getDraftGame() {
		if (draftGame) return draftGame;
		const games = await getGames();
		draftGame = games.find((g) => g.status === GameStatus.Draft) ?? null;
		return draftGame;
	}
</script>

<main class="column">
	<h3 class="logo">
		<Gitlab strokeWidth={3} />
		Packr
	</h3>
	<button onclick={newGame} class="btn btn-lg btn-primary">
		<Swords />
		New Game
	</button>
	<a href="/{base}/manage-players" class="btn btn-lg">
		<Users />
		Manage Players
	</a>
	<a href="/{base}/manage-roles" class="btn btn-lg">
		<Drama />
		Manage Roles
	</a>
	<a href="/{base}/settings" class="btn btn-lg">
		<Settings />
		Settings
	</a>
</main>

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
					<ArrowLeft />
				</button>
			</form>

			<button onclick={editDraftGame} class="btn btn-secondary">Draft</button>
			<button onclick={createNewGame} class="btn btn-primary">New</button>
		</div>
	</div>
</dialog>

<style>
	.column {
		align-items: center;
		gap: 1rem;
		justify-content: center;
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
