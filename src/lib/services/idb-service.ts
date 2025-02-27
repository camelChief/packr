import { openDB } from 'idb';

export async function getDatabase() {
	return openDB('packr', 1, {
		upgrade(db) {
			if (!db.objectStoreNames.contains('players')) {
				db.createObjectStore('players');
			}

			if (!db.objectStoreNames.contains('games')) {
				db.createObjectStore('games', { keyPath: 'id' });
			}
		}
	});
}
