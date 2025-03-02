<script lang="ts">
	import { goto } from "$app/navigation";
	import { base } from "$app/paths";
	import { SETTINGS } from "$lib/constants";
	import { GameStatus, type Game } from "$lib/models/game";
	import type { Setting, Settings } from "$lib/models/settings";
	import { updateGame } from "$lib/services/game-service";
	import { draftGameStore, eventStore } from "$lib/stores";
	import { onDestroy, onMount } from "svelte";
	import { get, type Unsubscriber } from "svelte/store";

    interface EditableSetting extends Setting {
        value: boolean | number | string;
    }

    let draftGame: Game;
    let settings: EditableSetting[] = $state([]);
    let unsubscribeFromEvents: Unsubscriber;

    function subscribeToEvents() {
		unsubscribeFromEvents = eventStore.subscribe(async (event) => {
			if (event === 'startGame') {
				eventStore.set('');
                draftGame.settings = mapSettingsToObj(settings);
                draftGame.status = GameStatus.Running;
				await updateGame(draftGame);
				draftGameStore.set(draftGame);
				goto(`${base}/game/${draftGame.id}`);
			}
		});
	}

    function populateSettings() {
        settings = SETTINGS.map(setting => ({ ...setting, value: setting.default }));
    }

    function mapSettingsToObj(settings: EditableSetting[]): Settings {
        const settingsObj: Settings = {};
        for (const setting of settings) settingsObj[setting.id] = setting.value;
        return settingsObj;
    }

    onMount(() => {
		const game = get(draftGameStore);
		if (game) draftGame = game;
		else return goto(`${base}/`);
        
        subscribeToEvents();
        populateSettings();
    });

    onDestroy(() => unsubscribeFromEvents());
</script>

<main>
    <p class="mb-8">Apply settings here which will only affect the current game.</p>

    <ul class="list">
        {#each settings as setting}
            <li class="list-row items-center">
                {#if setting.type === 'boolean'}
                    <input type="checkbox" bind:checked={setting.value as boolean} class="toggle" />
                {:else if setting.type === 'number'}
                    <input type="number" bind:value={setting.value as number} class="input w-10" />
                {/if}
                <div>
                    <div>{setting.label}</div>
                    <div class="text-base-content/50 text-base">{setting.description}</div>
                </div>
            </li>
        {/each}
    </ul>
</main>