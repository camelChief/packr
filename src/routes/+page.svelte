<script lang="ts">
	import { goto } from '$app/navigation';
	import { Game, GameStatus } from '$lib/models/game';
	import { createGame, deleteGame, getGames } from '$lib/services/game-service';
	import { ArrowLeft, Drama, Gitlab, Settings, Swords, Users } from 'lucide-svelte';

	async function newGame() {
		const draftGame = await getDraftGame();
		if (draftGame) {
			draftGameModal.showModal();
		} else {
			await createGame(new Game({}));
			goto('/new-game');
		}
	}

	async function editDraftGame() {
		const draftGame = await getDraftGame();
		if (!draftGame) {
			goto('/new-game');
			return;
		}

		const playerCount = draftGame.players.length;
		const missingRoles = draftGame.players.some(p => !p.role);

		if (playerCount < 7 || playerCount > 35) goto('/new-game/players');
		else if (missingRoles) goto('/new-game/roles');
		// todo: add more checks here
		// continue: now go through the rest of the game setup
		// to make sure the game obj in the db is being updated
		// correctly and utilising a store!
		else goto('/new-game');
	}

	async function createNewGame() {
		const draftGame = await getDraftGame();
		if (draftGame) await deleteGame(draftGame.id);
		await createGame(new Game({}));
		goto('/new-game');
	}

	async function getDraftGame() {
		const games = await getGames();
		return games.find((g) => g.status === GameStatus.Draft);
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
	<a href="/manage-players" class="btn btn-lg">
		<Users />
		Manage Players
	</a>
	<a href="/manage-roles" class="btn btn-lg">
		<Drama />
		Manage Roles
	</a>
	<a href="/settings" class="btn btn-lg">
		<Settings />
		Settings
	</a>
</main>

<dialog id="draftGameModal" class="modal">
	<div class="modal-box p-8">
		<h3>Draft Game</h3>
		<p>It looks like you were in the middle of setting up a game. Would you like to continue with your draft or discard and start a new game?</p>
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
