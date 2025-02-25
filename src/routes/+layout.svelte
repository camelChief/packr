<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	
	let { children } = $props();
	let height = $state("0px");
    
    onMount(() => height = `${window.innerHeight}px`);
</script>

<main style:height={height} class="sm:w-lg relative">
	{@render children()}
</main>