<script lang="ts">
	import { goto } from '$app/navigation';
	import { ROLES } from '$lib/constants';
	import { Game } from '$lib/models/game';
	import { RoleType, Team, type Role } from '$lib/models/role';
	import { updateGame } from '$lib/services/game-service';
	import { draftGameStore, eventStore } from '$lib/stores';
	import { CircleSmall, Gitlab, Minus, Plus, User } from 'lucide-svelte';
	import { onDestroy, onMount } from 'svelte';
	import { get, type Unsubscriber } from 'svelte/store';

	interface SelectableRole extends Role {
		selected?: boolean;
	}

	let draftGame: Game;
	let roles: SelectableRole[] = $state([]);
	let recommendedWerewolves = $state(0);
	let playerCount = 0;
	let werewolfCount = $state(0);
	let villagerCount = $derived(playerCount - werewolfCount);
	let unsubscribeFromEvents: Unsubscriber;

	function subscribeToEvents() {
		unsubscribeFromEvents = eventStore.subscribe(async (event) => {
			if (event === 'nextPage') {
				eventStore.set('');
				assignRoles();
				await updateGame(draftGame);
				draftGameStore.set(draftGame);
				goto('/new-game/settings');
			}
		});
	}

	function populateRoles() {
		roles = ROLES
			.filter((r) => r.type === RoleType.Special)
			.map((r) => ({ ...r, selected: false }));
	}

	async function calculateWerewolves() {
		playerCount = draftGame.players.length || 0;
		if (playerCount <= 15) recommendedWerewolves = 2;
		else if (playerCount === 16) recommendedWerewolves = 3;
		else recommendedWerewolves = Math.trunc((playerCount - 16) / 4) + 3;
		werewolfCount = recommendedWerewolves;
	}

	function select(name: string) {
		const role = roles.find((r) => r.name === name);
		if (role) role.selected = !role.selected;
	}

	// todo: this works quite well, but I'd love to clean it up
	// continue: with the settings page!
	function assignRoles() {
		const specialRoles = [...roles].filter((r) => {
			const isSpecial = r.type === RoleType.Special;
			return isSpecial && (r.required || r.selected);
		});

		// assemble standard roles
		const villagerSpecialRoles = specialRoles.filter((r) => r.team === Team.Villager);
		const trueVillagerCount = villagerCount - villagerSpecialRoles.length;
		const villagers = new Array(trueVillagerCount).fill('Villager');
		const trueWerewolfCount = werewolfCount - (specialRoles.length - villagerSpecialRoles.length);
		const werewolves = new Array(trueWerewolfCount).fill('Werewolf');
		
		// assemble all roles and players
		const specials = specialRoles.map((r) => r.name);
		const allRoles = [...villagers, ...werewolves, ...specials];

		draftGame.players = draftGame.players.map((p) => {
			const index = Math.floor(Math.random() * allRoles.length);
			const role = allRoles.splice(index, 1)[0];
			return { ...p, role };
		});
	}

	onMount(() => {
		const game = get(draftGameStore);
		if (game) draftGame = game;
		else return goto('/');

		subscribeToEvents();
		populateRoles();
		calculateWerewolves();
	});

	onDestroy(() => unsubscribeFromEvents());
</script>

{#snippet teamRoles(team: Team, bottomMargin: boolean = true)}
	<ul class="list rounded-box border-base-content/10 {bottomMargin ? 'mb-8' : ''} border-1">
		<li class="p-4 font-bold">
			{team === Team.Villager ? 'Villager' : 'Werewolf'}
			Roles
		</li>
		{#each roles.filter((r) => r.team === team) as role}
			<button onclick={() => select(role.name)} class="list-row">
				{#if role.required || role.selected}
					<role.icon />
					{role.name}
				{:else}
					<div class="opacity-25">
						<CircleSmall />
					</div>
					<span class="opacity-25">{role.name}</span>
				{/if}
			</button>
		{/each}
	</ul>
{/snippet}

<main>
	<p class="mb-8">
		Each game must include the Doctor, the Seer, and at least 1 Werewolf ({recommendedWerewolves} recommended
		for this game).
	</p>

	<ul class="list rounded-box border-base-content/10 mb-8 border-1">
		<li class="p-4 font-bold">Teams</li>
		<li class="list-row">
			<User />
			{villagerCount} Villagers
		</li>
		<li class="list-row">
			<Gitlab />
			{werewolfCount}
			{werewolfCount === 1 ? 'Werewolf' : 'Werewolves'}
			<div>
				<button
					onclick={() => werewolfCount--}
					class="btn btn-square btn-sm btn-error"
					disabled={werewolfCount === 1}
				>
					<Minus />
				</button>
				<button
					onclick={() => werewolfCount++}
					class="btn btn-square btn-sm btn-success"
					disabled={werewolfCount + 1 >= villagerCount - 1}
				>
					<Plus />
				</button>
			</div>
		</li>
	</ul>

	{@render teamRoles(Team.Villager)}
	{@render teamRoles(Team.Werewolf, false)}
</main>

<style>
	.list-row {
		align-items: center;
		text-align: left;
	}
</style>
