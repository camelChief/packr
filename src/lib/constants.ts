import { Beer, Eye, Gitlab, HeartCrack, Stethoscope, Swords, User, Wand } from 'lucide-svelte';
import { RoleType, Team, type Role } from './models/role';
import type { Setting } from './models/settings';

export const ROLES: Role[] = [
	{
		// standard roles
		name: 'Villager',
		icon: User,
		type: RoleType.Standard,
		team: Team.Villager,
		required: true
	},
	{
		name: 'Werewolf',
		icon: Gitlab,
		type: RoleType.Standard,
		team: Team.Werewolf,
		required: true
	},

	{
		// villager special roles
		name: 'Doctor',
		icon: Stethoscope,
		type: RoleType.Special,
		team: Team.Villager,
		required: true
	},
	{
		name: 'Seer',
		icon: Eye,
		type: RoleType.Special,
		team: Team.Villager,
		required: true
	},
	{
		name: 'Witch',
		icon: Wand,
		type: RoleType.Special,
		team: Team.Villager
	},
	{
		name: 'Village Drunk',
		icon: Beer,
		type: RoleType.Special,
		team: Team.Villager
	},
	{
		name: 'Cupid',
		icon: HeartCrack,
		type: RoleType.Special,
		team: Team.Villager
	},
	{
		name: 'Vigilante',
		icon: Swords,
		type: RoleType.Special,
		team: Team.Villager
	},

	{
		// werewolf special roles
		name: 'Alpha Werewolf',
		icon: Gitlab,
		type: RoleType.Special,
		team: Team.Werewolf
	},
	{
		name: 'Lone Wolf',
		icon: Gitlab,
		type: RoleType.Special,
		team: Team.Werewolf
	},
	{
		name: 'Wolf Cub',
		icon: Gitlab,
		type: RoleType.Special,
		team: Team.Werewolf
	}
];

export const SETTINGS: Setting[] = [
	{
		// toggle settings
		id: 'aiGeneratedDeathMessages',
		label: 'AI Death Messages',
		description: 'Use AI to generate short and funny death messages',
		type: 'boolean',
		default: true
	},
	{
		id: 'revealRolesAfterDeath',
		label: 'Reveal Roles',
		description: 'Player roles are revealed after they die',
		type: 'boolean',
		default: false
	},

	{
		// numeric settings
		id: 'countWerewolvesFrequency',
		label: 'Werewolf Count Frequency',
		description: 'Reveal the number of werewolves left in the game every X days',
		type: 'number',
		default: 0
	}
];
