<script lang="ts">
	import { goto } from "$app/navigation";
	import { Game, Status } from "$lib/models/game";
	import { createGame, getGames } from "$lib/services/game-service";
	import { getPlayers } from "$lib/services/player-service";
	import { eventStore, validationStore } from "$lib/stores";
	import { Square, SquareCheck, SquareMinus, UserSquare } from "lucide-svelte";
	import { onMount } from "svelte";

    let names: string[] = [];
    let selectedNames: string[] = [];

    function selectAll() {
        if (selectedNames.length > 0) selectedNames = [];
        else selectedNames = names;
        validate();
    }

    function select(name: string) {
        if (selectedNames.includes(name)) selectedNames = selectedNames.filter(s => s !== name);
        else selectedNames = [...selectedNames, name];
        validate();
    }

    function validate() {
        const count = selectedNames.length;
        if (count < 7 || count > 35) {
            validationStore.update(v => v.filter(v => v !== "validPlayerCount"));
        } else {
            validationStore.update(v => {
                if (v.includes("validPlayerCount")) return v;
                return [ ...v, "validPlayerCount" ];
            });
        }
    }

    function subscribeToEvents() {
        eventStore.subscribe(async (event) => {
            if (event === "nextPage") {
                eventStore.set("");
                const id = new Date().getTime();
                const game = new Game(id, selectedNames);
                await createGame(game);
                goto("/new-game/roles");
            }
        });
    }

    async function populateNames() {
        let players = await getPlayers();
        names = players.map(player => player.name);
        let games = await getGames();
        let setUpGame = games.find(game => game.status === Status.SettingUp);
        selectedNames = setUpGame?.players ?? [];
    }

    onMount(async () => {
        subscribeToEvents();
        await populateNames();
        validate();
    });
</script>

{#if names?.length}
    <p class="pb-8">Select <strong>at least 7</strong> and <strong>at most 35</strong> players to be involved in this game of Werewolf.</p>
    <ul class="list">
        <button onclick={selectAll} class="list-row bg-base-200">
            {#if selectedNames.length === names.length}
                <SquareCheck />
            {:else if selectedNames.length > 0}
                <div class="opacity-50">
                    <SquareMinus />
                </div>
            {:else}
                <div class="opacity-25">
                    <Square />
                </div>
            {/if}
            {selectedNames.length} selected
        </button>
        {#each names as name}
            <button onclick={() => select(name)} class="list-row">
                {#if selectedNames.includes(name)}
                    <UserSquare />
                {:else}
                    <div class="opacity-25">
                        <Square />
                    </div>
                {/if}
                {name}
            </button>
        {/each}
    </ul>
{:else}
    <!-- todo: upgrade this with an image :) -->
    <div class="empty">
        No players found!
        <br>Add players on the Manage Player page.
    </div>
{/if}

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