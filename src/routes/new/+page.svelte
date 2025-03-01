<script lang="ts">
	import { base } from '$app/paths';
	import { Package } from 'lucide-svelte';
</script>

<main class="column">
	<h1 class="title">
		<Package size={36} strokeWidth={3} />
		Packr
	</h1>
	<p class="description">A local-first tool for managing in-person games of Werewolf.</p>
	<a href="{base}" class="btn btn-primary btn-lg">Get Started</a>
</main>

<style>
	.column {
		align-items: center;
		justify-content: center;
		padding: 2rem;
	}

	.title {
		align-items: center;
		animation:
			titleFade 1s forwards,
			titleSlide1 1s forwards 1s,
			titleSlide2 1s forwards 4s;
		display: inline-flex;
		gap: 0.75rem;
		opacity: 0;
		transform: translateY(4rem);
	}

	.description {
		animation:
			descFadeSlide 1s forwards 1.5s,
			descSlide 1s forwards 4.25s;
		opacity: 0;
		text-align: center;
		transform: translateY(2rem);
	}

	.btn {
		animation: linkFadeSlide 1s forwards 4.5s;
		margin-top: 2rem;
		opacity: 0;
		transform: translateY(2rem);
	}

	@keyframes titleFade {
		to {
			opacity: 1;
		}
	}

	@keyframes titleSlide1 {
		to {
			transform: translateY(1rem);
		}
	}

	@keyframes titleSlide2 {
		to {
			transform: translateY(0);
		}
	}

	@keyframes descFadeSlide {
		to {
			opacity: 1;
			transform: translateY(1rem);
		}
	}

	@keyframes descSlide {
		to {
			transform: translateY(0);
		}
	}

	@keyframes linkFadeSlide {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
