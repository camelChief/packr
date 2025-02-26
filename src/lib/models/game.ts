export enum Status {
	Draft,
	Running,
	Complete
}

interface GameObj {
	id: number;
	status: Status;
	players: string[];
}

export class Game implements GameObj {
	id: number;
	status: Status;
	players: string[];

	constructor(id: number, players: string[], status = Status.Draft) {
		this.id = id;
		this.status = status;
		this.players = players;
	}

	static fromObj(obj: GameObj): Game {
		return new Game(obj.id, obj.players, obj.status);
	}

	toObj(): GameObj {
		return {
			id: this.id,
			status: this.status,
			players: this.players
		};
	}
}
