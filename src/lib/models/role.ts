export enum Type {
    Standard,
    Special
}

export enum Team {
    Villager,
    Werewolf
}

export interface Role {
    name: string;
    icon: any;
    type: Type;
    team: Team;
    required?: boolean;
}