<script lang="ts">
	import { Gitlab, Settings, Swords, Users } from "lucide-svelte";
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
    <a href="/players" class="btn btn-lg">
        <Users />
        Manage Players
    </a>
    <button class="btn btn-lg" disabled>
        <Settings />
        Settings
    </button>
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
        gap: .5rem;
        left: 2rem;
        position: absolute;
        top: 2rem;
    }
</style>