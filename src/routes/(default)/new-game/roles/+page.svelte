<script lang="ts">
	import { Status } from "$lib/models/game";
	import { Team } from "$lib/models/role";
	import { getGames } from "$lib/services/game-service";
	import { Beer, CircleSmall, Eye, Gitlab, Heart, HeartCrack, Minus, Plus, Stethoscope, Sword, User, Wand } from "lucide-svelte";
	import { onMount } from "svelte";

    // todo - move over to ROLES from constants.ts
    let roles = $state([
        {
            name: 'Doctor',
            icon: Stethoscope,
            team: Team.Villager,
            required: true
        },
        {
            name: 'Seer',
            icon: Eye,
            team: Team.Villager,
            required: true
        },
        {
            name: 'Witch',
            icon: Wand,
            team: Team.Villager,
            selected: false
        },
        {
            name: 'Village Drunk',
            icon: Beer,
            team: Team.Villager,
            selected: false
        },
        {
            name: 'Alpha Werewolf',
            icon: Gitlab,
            team: Team.Werewolf,
            selected: false
        },
        {
            name: 'Cupid',
            icon: HeartCrack,
            team: Team.Villager,
            selected: false
        },
        {
            name: 'Lone Wolf',
            icon: Gitlab,
            team: Team.Werewolf,
            selected: false
        },
        {
            name: 'Vigilante',
            icon: Sword,
            team: Team.Villager,
            selected: false
        },
        {
            name: 'Wolf Cub',
            icon: Gitlab,
            team: Team.Werewolf,
            selected: false
        }
    ]);

    let recommendedWerewolves = $state(0);
    let playerCount = 0;
    let werewolfCount = $state(0);
    let villagerCount = $derived(playerCount - werewolfCount);

    async function calculateWerewolves() {
        const games = await getGames();
        const draftGame = games.find(game => game.status === Status.Draft);
        playerCount = draftGame?.players.length || 0;
        if (playerCount <= 15) recommendedWerewolves = 2;
        else if (playerCount === 16) recommendedWerewolves = 3;
        else recommendedWerewolves = Math.trunc((playerCount - 16) / 4) + 3;
        werewolfCount = recommendedWerewolves;
    }

    function select(name: string) {
        const role = roles.find(role => role.name === name);
        if (role) role.selected = !role.selected;
        // roles = [...roles];
    }

    onMount(() => {
        calculateWerewolves();
    });
</script>

<!-- <h4>Required Roles</h4> -->
<p class="mb-8">
    Each game must include the Doctor, the Seer, and at least 1 Werewolf ({recommendedWerewolves} recommended for this game).
</p>

<ul class="list mb-8 rounded-box border-1 border-base-content/10">
    <li class="p-4 font-bold">Teams</li>
    <li class="list-row">
        <User />
        {villagerCount} Villagers
    </li>
    <li class="list-row">
        <Gitlab />
        {werewolfCount} {werewolfCount === 1 ? 'Werewolf' : 'Werewolves'}
        <div>
            <button onclick={() => werewolfCount--} class="btn btn-square btn-sm btn-error" disabled={werewolfCount === 1}>
                <Minus />
            </button>
            <button onclick={() => werewolfCount++} class="btn btn-square btn-sm btn-success" disabled={werewolfCount + 1 >= villagerCount - 1}>
                <Plus />
            </button>
        </div>
    </li>
</ul>

<ul class="list mb-8 rounded-box border-1 border-base-content/10">
    <li class="p-4 font-bold">Villager Roles</li>
    {#each roles.filter(r => r.team === Team.Villager) as role}
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

<ul class="list mb-8 rounded-box border-1 border-base-content/10">
    <li class="p-4 font-bold">Werewolf Roles</li>
    {#each roles.filter(r => r.team === Team.Werewolf) as role}
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