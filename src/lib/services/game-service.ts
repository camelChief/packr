import { Game } from "$lib/models/game";
import { getDatabase } from "./idb-service";

// create
export async function createGame(game: Game) {
    const db = await getDatabase();
    await db.add("games", game.toObj());
}

// read
export async function getGames() {
    const db = await getDatabase();
    const games = await db.getAll("games");
    return games.map(game => new Game(game.id, game.players));
}

// delete
export async function deleteGame(id: number) {
    const db = await getDatabase();
    await db.delete("games", id);
}