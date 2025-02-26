export enum RoleType {
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
    type: RoleType;
    team: Team;
    required?: boolean;
}