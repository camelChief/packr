import { Player } from '$lib/models/player';
import { getDatabase } from './idb-service';

// create
export async function createPlayer(player: Player) {
	const db = await getDatabase();
	await db.add('players', player.toObj());
}

// read
export async function getPlayers() {
	const db = await getDatabase();
	const players = await db.getAll('players');
	return players.map(Player.fromObj);
}

// delete
export async function deletePlayer(name: string) {
	const db = await getDatabase();
	await db.delete('players', name);
}
