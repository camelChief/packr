<!-- todo: check over this file -->

<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import { ActionType } from '$lib/models/page-data';
	import { eventStore, validationStore } from '$lib/stores';
	import { ArrowLeft, Package } from 'lucide-svelte';
	import { onDestroy, onMount } from 'svelte';
	import type { Unsubscriber } from 'svelte/store';

	let { children } = $props();
	let validations: string[] = $state([]);
	let unsubscribeFromValidations: Unsubscriber;

	onMount(() => {
		unsubscribeFromValidations = validationStore.subscribe((v) => (validations = v));
	});

	onDestroy(() => unsubscribeFromValidations());
</script>

<main class="column">
	<section class="top-bar border-base-content/10">
		<a href="{base}/" class="opacity-25">
			<Package strokeWidth={2.5} />
		</a>
		<h3>{page.data.title ?? 'Unknown'}</h3>
	</section>
	<section class="content">
		{@render children()}
	</section>
	<section class="bottom-bar border-base-content/10">
		<div class="actions rounded-box">
			{#if page.data.useBackButton}
				<a href={page.data.backButtonUrl} class="btn btn-square">
					{#if page.data.backButtonIcon}
						<page.data.backButtonIcon size={20} />
					{:else}
						<ArrowLeft size={20} />
					{/if}
				</a>
			{/if}
			{#each page.data.actions as action}
				{#if action.type === ActionType.Button}
					<button
						onclick={() => eventStore.set(action.reference)}
						class={['btn btn-square', action.class]}
						disabled={action.validIf && !validations.includes(action.validIf)}
					>
						<action.icon size={20} />
					</button>
				{:else if action.type === ActionType.Link}
					<a
						href={action.reference}
						class="btn btn-square {action.class} {action.validIf &&
						validations.includes(action.validIf)
							? ''
							: 'btn-disabled'}"
					>
						<action.icon size={20} />
					</a>
				{/if}
			{/each}
		</div>
	</section>
</main>

<style>
	.top-bar {
		align-items: center;
		border-bottom-style: solid;
		border-bottom-width: 1px;
		column-gap: .5rem;
		display: flex;
		flex-shrink: 0;
		padding: 2rem 2rem 1rem 2rem;
	}

	.breadcrumb {
		align-items: center;
		display: flex;
		font-weight: bold;
		gap: 0.5rem;
		margin-bottom: -0.5rem;
		opacity: 0.25;
	}

	.logo {
		align-items: center;
		display: flex;
		gap: 0.25rem;
	}

	.content {
		flex-grow: 1;
		overflow-y: auto;
		padding: 2rem;
	}

	.bottom-bar {
		border-top-style: solid;
		border-top-width: 1px;
		flex-shrink: 0;
		height: 2.25rem;
	}

	.bottom-bar .actions {
		background-color: var(--color-base-100);
		bottom: 1rem;
		display: flex;
		gap: 0.5rem;
		position: absolute;
		right: 2rem;
	}
</style>
