<script lang="ts">
	import { goto } from '$app/navigation';
	import { ROLES } from '$lib/constants';
	import { GameStatus } from '$lib/models/game';
	import { RoleType, Team, type Role } from '$lib/models/role';
	import { getGames } from '$lib/services/game-service';
	import { eventStore } from '$lib/stores';
	import { CircleSmall, Gitlab, Minus, Plus, User } from 'lucide-svelte';
	import { onDestroy, onMount } from 'svelte';
	import type { Unsubscriber } from 'svelte/store';

	interface SelectableRole extends Role {
		selected?: boolean;
	}

	let roles: SelectableRole[] = $state([]);
	let recommendedWerewolves = $state(0);
	let playerCount = 0;
	let werewolfCount = $state(0);
	let villagerCount = $derived(playerCount - werewolfCount);
	let unsubscribeFromEvents: Unsubscriber;

	function populateRoles() {
		roles = ROLES.filter((role) => role.type === RoleType.Special).map((role) => ({
			...role,
			selected: false
		}));
	}

	function subscribeToEvents() {
		unsubscribeFromEvents = eventStore.subscribe(async (event) => {
			if (event === 'nextPage') {
				eventStore.set('');

				// const games = await getGames();
				// const draftGame = games.find((game) => game.status === Status.Draft);
				// if (draftGame) {
				// 	draftGame.players = selectedNames;
				// 	await updateGame(draftGame);
				// } else {
				// 	// create new game
				// 	const id = new Date().getTime();
				// 	const game = new Game(id, selectedNames);
				// 	await createGame(game);
				// }

				// navigate to next page
				goto('/new-game/settings');
			}
		});
	}

	async function calculateWerewolves() {
		const games = await getGames();
		const draftGame = games.find((game) => game.status === GameStatus.Draft);
		playerCount = draftGame?.players.length || 0;
		if (playerCount <= 15) recommendedWerewolves = 2;
		else if (playerCount === 16) recommendedWerewolves = 3;
		else recommendedWerewolves = Math.trunc((playerCount - 16) / 4) + 3;
		werewolfCount = recommendedWerewolves;
	}

	function select(name: string) {
		const role = roles.find((role) => role.name === name);
		if (role) role.selected = !role.selected;
		// roles = [...roles];
	}

	onMount(() => {
		subscribeToEvents();
		populateRoles();
		calculateWerewolves();
	});

	onDestroy(() => unsubscribeFromEvents());
</script>

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

<ul class="list rounded-box border-base-content/10 mb-8 border-1">
	<li class="p-4 font-bold">Villager Roles</li>
	{#each roles.filter((r) => r.team === Team.Villager) as role}
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

<ul class="list rounded-box border-base-content/10 mb-8 border-1">
	<li class="p-4 font-bold">Werewolf Roles</li>
	{#each roles.filter((r) => r.team === Team.Werewolf) as role}
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

<style>
	.list-row {
		align-items: center;
		text-align: left;
	}

	.empty {
		align-items: center;
		display: flex;
		height: 100%;
		text-align: center;
	}
</style>
