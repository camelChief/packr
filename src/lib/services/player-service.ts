import { getDatabase } from './idb-service';

// create
export async function createPlayer(player: string) {
	const db = await getDatabase();
	await db.add('players', player, player);
}

// read
export async function getPlayers() {
	const db = await getDatabase();
	return await db.getAll('players');
}

export async function countPlayers() {
	const db = await getDatabase();
	return await db.count('players');
}

// delete
export async function deletePlayer(player: string) {
	const db = await getDatabase();
	await db.delete('players', player);
}
