<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { Plus } from 'lucide-svelte';
	import Intro from './Intro.svelte';
	import Players from './Players.svelte';

	interface Page {
		title: string;
		component: any;
		addFunctionality?: boolean;
		backText?: string;
		nextText?: string;
	}

	const pages: Page[] = [
		{
			title: 'Your First Game',
			component: Intro,
			backText: 'Home'
		},
		{
			title: 'Players',
			component: Players,
			addFunctionality: true
		}
	];

	let pageIndex = $state(0);
	let page = $derived(pages[pageIndex]);

	function back() {
		if (pageIndex === 0) goto(`${base}`);
		else pageIndex--;
	}

	function next() {
		if (pageIndex < pages.length - 1) pageIndex++;
	}
</script>

<main class="column">
	<section class="top-bar">
		<h3>{page.title}</h3>
		{#if page.addFunctionality}
			<div class="grow"></div>
			<button onclick={() => page.component.add()} class="btn btn-square btn-primary">
				<Plus />
			</button>
		{/if}
	</section>
	<section class="content">
		<page.component />
	</section>
	<section class="bottom-bar">
		<button onclick={back} class="btn btn-lg">{page.backText ?? 'Back'}</button>
		<button onclick={next} class="btn btn-lg btn-primary">Next</button>
	</section>
</main>

<style>
	.top-bar {
		align-items: center;
		border-bottom: 1px solid var(--color-base-300);
		display: flex;
		padding: 1rem;
	}

	.content {
		flex-grow: 1;
		padding: 2rem;
	}

	.bottom-bar {
		border-top: 1px solid var(--color-base-300);
		display: flex;
		gap: 0.5rem;
		justify-content: end;
		padding: 1rem;
	}
</style>
