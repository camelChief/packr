<script lang="ts">
	import { goto } from "$app/navigation";
	import { base } from "$app/paths";
	import { ROLES } from "$lib/constants";
	import { GameStatus, type Game, type PlayerRolePair } from "$lib/models/game";
	import { type Role } from "$lib/models/role";
	import { getGames } from "$lib/services/game-service";
	import { ArrowLeft, ArrowRight, Grip, X } from "lucide-svelte";
	import { onMount } from "svelte";

	let game: Game | undefined = $state();
	let selectedIndex: number | undefined = $state();
	let selectedPlayer: PlayerRolePair | undefined = $derived(selectedIndex !== undefined ? game!.players[selectedIndex] : undefined);
	let selectedRole: Role | undefined = $derived(selectedPlayer !== undefined ? ROLES.find(r => r.name === selectedPlayer!.role) : undefined);

	onMount(async () => {
		const games = await getGames();
		const inProgressGame = games.find(g => g.status === GameStatus.InProgress);
		if (inProgressGame) game = inProgressGame;
		else return goto(`${base}/`);
	});
</script>

<main>
	<ul class="list rounded-box border-base-content/10 border-1">
		{#each game?.players ?? [] as player, index}
			{@const role = ROLES.find((r) => r.name === player.role)!}
			<button onclick={() => {
				selectedIndex = index;
				roleModal.showModal();
			}} class="list-row items-center text-start">
				<role.icon />
				{player.player}
				<div class="text-base-content/25"><Grip /></div>
			</button>
		{/each}
	</ul>
</main>

<dialog id="roleModal" class="modal">
	<div class="modal-box relative">
		<p class="text-base-content/25 absolute top-8">{selectedPlayer?.player}, A.K.A.:</p>
		{#if selectedRole}
			<selectedRole.icon size={256} />
		{/if}
		<h3>{selectedRole?.name}</h3>
		<p>{selectedRole?.description}</p>
		<div class="modal-action">
			<form method="dialog">
				<button onclick={() => selectedIndex = undefined} class="btn btn-square">
					<X />
				</button>
			</form>
			<button onclick={() => {
				if (selectedIndex === 0) selectedIndex = game!.players.length - 1;
				else selectedIndex = selectedIndex! - 1;
			}} class="btn btn-square">
				<ArrowLeft />
			</button>
			<button onclick={() => {
				if (selectedIndex === game!.players.length - 1) selectedIndex = 0;
				else selectedIndex = selectedIndex! + 1;
			}} class="btn btn-square">
				<ArrowRight />
			</button>
		</div>
	</div>
</dialog>

<style>
	.modal {
		backdrop-filter: blur(.5rem);
	}

	.modal-box {
		align-items: center;
		aspect-ratio: 3/4;
		display: flex;
		flex-direction: column;
		justify-content: center;
		overflow-y: visible;
		padding: 2rem;
	}

	.modal-action {
		bottom: -1.25rem;
		position: absolute;
		right: 2rem;
	}

	.player-animate {
		animation: playerFlash 1s forwards;
		background-color: var(--color-base-content);
		color: var(--color-base-100);
		padding-inline: .5rem;
	}

	@keyframes playerFlash {
		to {
			background-color: inherit;
			color: inherit;
		}
	}
</style>