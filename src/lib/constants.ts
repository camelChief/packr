import Wolf from '$lib/components/Wolf.svelte';
import { Beer, Eye, HeartCrack, Stethoscope, Swords, User, Wand } from 'lucide-svelte';
import { RoleType, Team, type Role } from './models/role';
import type { Setting } from './models/settings';

export const ROLES: Role[] = [
	{
		// standard roles
		name: 'Villager',
		icon: User,
		description: 'Defend the Village.',
		type: RoleType.Standard,
		team: Team.Villager,
		required: true
	},
	{
		name: 'Werewolf',
		icon: Wolf,
		description: 'Take over the Village.',
		type: RoleType.Standard,
		team: Team.Werewolf,
		required: true
	},

	{
		// villager special roles
		name: 'Doctor',
		icon: Stethoscope,
		description: 'Heal the innocent.',
		type: RoleType.Special,
		team: Team.Villager,
		required: true
	},
	{
		name: 'Seer',
		icon: Eye,
		description: 'Find the Werewolves.',
		type: RoleType.Special,
		team: Team.Villager,
		required: true
	},
	{
		name: 'Witch',
		icon: Wand,
		description: 'Heal once, kill once.',
		type: RoleType.Special,
		team: Team.Villager
	},
	{
		name: 'Village Drunk',
		icon: Beer,
		description: 'Speak only gibberish.',
		type: RoleType.Special,
		team: Team.Villager
	},
	{
		name: 'Cupid',
		icon: HeartCrack,
		description: 'Bind players with love.',
		type: RoleType.Special,
		team: Team.Villager
	},
	{
		name: 'Vigilante',
		icon: Swords,
		description: 'Handle it yourself.',
		type: RoleType.Special,
		team: Team.Villager
	},

	{
		// werewolf special roles
		name: 'Alpha Werewolf',
		icon: Wolf,
		description: 'Say \'Werewolf\' daily.',
		type: RoleType.Special,
		team: Team.Werewolf
	},
	{
		name: 'Lone Wolf',
		icon: Wolf,
		description: 'Be the last one standing.',
		type: RoleType.Special,
		team: Team.Werewolf
	},
	{
		name: 'Wolf Cub',
		icon: Wolf,
		description: 'Beloved by wolf-kind.',
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
