import { Game } from '$lib/models/game';
import { getDatabase } from './idb-service';

// create
export async function createGame(game: Game) {
	const db = await getDatabase();
	await db.add('games', game.toObj());
}

// read
export async function getGames() {
	const db = await getDatabase();
	const games = await db.getAll('games');
	return games.map((game) => new Game(game));
}

// update
export async function updateGame(game: Game) {
	const db = await getDatabase();
	await db.put('games', game.toObj());
}

// delete
export async function deleteGame(id: string) {
	const db = await getDatabase();
	await db.delete('games', id);
}
