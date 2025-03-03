<script lang="ts">
	import { Construction } from 'lucide-svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<main class="column items-center justify-center">
	<Construction size={128} />
	<p class="mt-4 text-center">
		Under construction!
		<br />Come back later :)
	</p>
</main>
