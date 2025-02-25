interface PlayerObj {
	name: string;
	blacklist: string[];
}

export class Player implements PlayerObj {
	name: string;
	blacklist: string[];

	constructor(name: string, blacklist: string[]) {
		this.name = name;
		this.blacklist = blacklist;
	}

	static fromObj(obj: PlayerObj) {
		return new Player(obj.name, obj.blacklist);
	}

	toObj(): PlayerObj {
		return {
			name: this.name,
			blacklist: this.blacklist
		};
	}
}
