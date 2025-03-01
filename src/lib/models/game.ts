import type { Settings } from './settings';

export enum GameStatus {
	Draft,
	Running,
	Complete
}

interface PlayerRolePair {
	player: string;
	role?: string;
}

export interface GameObj {
	id: string;
	status: GameStatus;
	players: PlayerRolePair[];
	settings: Settings;
}

export class Game implements GameObj {
	id: string;
	status: GameStatus;
	players: PlayerRolePair[];
	settings: Settings;

	constructor(options: Partial<GameObj>) {
		const year = new Date().getFullYear().toString().slice(2);
		const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
		const day = new Date().getDate().toString().padStart(2, '0');
		const hours = new Date().getHours().toString().padStart(2, '0');
		const minutes = new Date().getMinutes().toString().padStart(2, '0');
		const timeId = `${year}${month}${day}-${hours}${minutes}`;

		this.id = options.id ?? timeId;
		this.status = options.status ?? GameStatus.Draft;
		this.players = options.players ?? [];
		this.settings = options.settings ?? {};
	}

	toObj(): GameObj {
		return {
			id: this.id,
			status: this.status,
			players: this.players,
			settings: this.settings
		};
	}
}
