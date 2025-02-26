<script lang="ts">
	import { Drama, Gitlab, Settings, Swords, Users } from 'lucide-svelte';
</script>

<main class="column">
	<h3 class="logo">
		<Gitlab strokeWidth={3} />
		Packr
	</h3>
	<a href="/new-game" class="btn btn-lg btn-primary">
		<Swords />
		New Game
	</a>
	<a href="/manage-players" class="btn btn-lg">
		<Users />
		Manage Players
	</a>
	<a href="/manage-roles" class="btn btn-lg">
		<Drama />
		Manage Roles
	</a>
	<a href="/settings" class="btn btn-lg">
		<Settings />
		Settings
	</a>
</main>

<style>
	.column {
		align-items: center;
		gap: 1rem;
		justify-content: center;
	}

	.logo {
		align-items: center;
		display: flex;
		gap: 0.5rem;
		left: 2rem;
		position: absolute;
		top: 2rem;
	}
</style>
