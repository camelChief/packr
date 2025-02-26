import { Beer, Eye, Gitlab, HeartCrack, Stethoscope, Sword, User, Wand } from "lucide-svelte";
import { Team, Type, type Role } from "./models/role";

export const ROLES: Role[] = [
    { // standard roles
        name: 'Villager',
        icon: User,
        type: Type.Standard,
        team: Team.Villager,
        required: true
    },
    {
        name: 'Werewolf',
        icon: Gitlab,
        type: Type.Standard,
        team: Team.Werewolf,
        required: true
    },

    { // villager special roles
        name: 'Doctor',
        icon: Stethoscope,
        type: Type.Special,
        team: Team.Villager,
        required: true
    },
    {
        name: 'Seer',
        icon: Eye,
        type: Type.Special,
        team: Team.Villager,
        required: true
    },
    {
        name: 'Witch',
        icon: Wand,
        type: Type.Special,
        team: Team.Villager,
    },
    {
        name: 'Village Drunk',
        icon: Beer,
        type: Type.Special,
        team: Team.Villager,
    },
    {
        name: 'Cupid',
        icon: HeartCrack,
        type: Type.Special,
        team: Team.Villager,
    },
    {
        name: 'Vigilante',
        icon: Sword,
        type: Type.Special,
        team: Team.Villager,
    },

    { // werewolf special roles
        name: 'Alpha Werewolf',
        icon: Gitlab,
        type: Type.Special,
        team: Team.Werewolf,
    },
    {
        name: 'Lone Wolf',
        icon: Gitlab,
        type: Type.Special,
        team: Team.Werewolf,
    },
    {
        name: 'Wolf Cub',
        icon: Gitlab,
        type: Type.Special,
        team: Team.Werewolf,
    }
];