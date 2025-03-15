<!-- todo: check over this file -->

<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import { ActionType } from '$lib/models/page-data';
	import { eventStore, validationStore } from '$lib/stores';
	import { ArrowLeft, MoveRight, Package } from 'lucide-svelte';
	import { onDestroy, onMount } from 'svelte';
	import type { Unsubscriber } from 'svelte/store';

	let { children } = $props();
	let content: HTMLElement;
	let headerSize = $state('1.75rem');
	let validations: string[] = $state([]);
	let unsubscribeFromValidations: Unsubscriber;

	function scroll() {
		if (content.scrollTop > 32) headerSize = '1.25rem';
		else headerSize = '1.75rem';
	}

	onMount(() => {
		unsubscribeFromValidations = validationStore.subscribe((v) => (validations = v));
	});

	onDestroy(() => unsubscribeFromValidations());
</script>

<main class="column">
	<section class="top-bar border-base-content/10">
		{#if headerSize === '1.75rem'}
		<div class="breadcrumb">
			<a href="{base}/" class="logo">
				<Package size={16} strokeWidth={3} />
				Packr
			</a>
			{#each page.data.breadcrumbs as crumb}
				<MoveRight size={16} strokeWidth={3} />
				{crumb}
			{/each}
		</div>
		{/if}
		<h3 style:font-size={headerSize}>{page.data.title ?? 'Unknown'}</h3>
	</section>
	<section bind:this={content} onscroll={scroll} class="content">
		{@render children()}
	</section>
	<section class="bottom-bar border-base-content/10">
		<div class="actions rounded-box">
			{#if page.data.useBackButton}
				<a href={page.data.backButtonUrl} class="btn btn-square">
					{#if page.data.backButtonIcon}
						<page.data.backButtonIcon />
					{:else}
						<ArrowLeft />
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
						<action.icon />
					</button>
				{:else if action.type === ActionType.Link}
					<a
						href={action.reference}
						class="btn btn-square {action.class} {action.validIf &&
						validations.includes(action.validIf)
							? ''
							: 'btn-disabled'}"
					>
						<action.icon />
					</a>
				{/if}
			{/each}
		</div>
	</section>
</main>

<style>
	.top-bar {
		border-bottom-style: solid;
		border-bottom-width: 1px;
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
		height: 3.25rem;
	}

	.bottom-bar .actions {
		background-color: var(--color-base-100);
		bottom: 2rem;
		display: flex;
		gap: 0.5rem;
		position: absolute;
		right: 2rem;
	}
</style>
