<script lang="ts">
	import { page } from '$app/state';
	import { ActionType } from '$lib/models/page-data';
	import { eventStore, validationStore } from '$lib/stores';
	import { ArrowLeft, Gitlab, MoveRight } from 'lucide-svelte';
	import { onMount } from 'svelte';

	let { children } = $props();
    let validations: string[] = $state([]);

    onMount(() => {
        validationStore.subscribe(v => validations = v);
    });
</script>

<main class="column">
    <section class="top-bar">
        <div class="breadcrumb">
            <a href="/" class="logo">
                <Gitlab size={16} strokeWidth={3} />
                Packr
            </a>
            {#each page.data.breadcrumbs as crumb}
                <MoveRight size={16} strokeWidth={3} />
                {crumb}
            {/each}
        </div>
        <h3 class="title">{page.data.title ?? "Unknown"}</h3>
    </section>
    <section class="content">
        {@render children()}
    </section>
    <section class="bottom-bar">
        <div class="actions">
            {#if page.data.useBackButton}
                <a href={page.data.backButtonUrl} class="btn btn-lg btn-square">
                    {#if page.data.backButtonIcon}
                        <page.data.backButtonIcon />
                    {:else}
                        <ArrowLeft />
                    {/if}
                </a>
            {/if}
            {#each page.data.actions as action}
                {#if action.type === ActionType.Button}
                    <button onclick={() => eventStore.set(action.reference)} class={["btn btn-lg btn-square", action.class]} disabled={action.validIf && !validations.includes(action.validIf)}>
                        <action.icon />
                    </button>
                {:else if action.type === ActionType.Link}
                    <a href={action.reference} class="btn btn-lg btn-square {action.class} {action.validIf && validations.includes(action.validIf) ? "" : "btn-disabled"}">
                        <action.icon />
                    </a>
                {/if}
            {/each}
        </div>
    </section>
</main>

<style>
    .top-bar {
        border-bottom: 1px solid var(--color-base-300);
        flex-shrink: 0;
        padding: 2rem 2rem 1rem 2rem;
    }

    .breadcrumb {
        align-items: center;
        display: flex;
        font-weight: bold;
        gap: .5rem;
        margin-bottom: -.5rem;
        opacity: .25;
    }

    .logo {
        align-items: center;
        display: flex;
        gap: .25rem;
    }

    .content {
        flex-grow: 1;
        overflow-y: auto;
        padding: 2rem;
    }

    .bottom-bar {
        border-top: 1px solid var(--color-base-300);
        flex-shrink: 0;
        height: 3.5rem;
    }

    .bottom-bar .actions {
        background-color: var(--color-base-100);
        bottom: 2rem;
        display: flex;
        gap: .5rem;
        position: absolute;
        right: 2rem;
    }
</style>