<script lang="ts">
	import { createPlayer, getPlayers, deletePlayer } from '$lib/services/idb-serviceb-service';
	import { Player } from '$lib/models';
	import { ArrowLeft, CircleUser, Plus, Save, X } from 'lucide-svelte';
	import { onMount } from 'svelte';

	let players: Player[];
	let newPlayerName = '';
	let newPlayerBlacklist = '';

	onMount(async () => {
		players = await getPlayers();
	});

	async function createNewPlayer() {
		const blacklist = newPlayerBlacklist.split(',');
		const newPlayer = new Player(newPlayerName, blacklist);
		await createPlayer(newPlayer);
		players = [...players, newPlayer];

		newPlayerName = '';
		newPlayerBlacklist = '';
		addPlayerModal.close();
	}

	async function deletePlayer(name: string) {
		// await deletePlayer(name);
		// players = await getPlayers();
	}

	function add() {
		addPlayerModal.showModal();
	}
</script>

<main>
	<ul class="list bg-base-100">
		<!-- shadow-md rounded-box"> -->
		{#each players as player}
			<li class="list-row items-center">
				<CircleUser />
				<span>{player.name}</span>
				<button on:click={() => deletePlayer(player.name)} class="btn btn-square btn-sm">
					<X />
				</button>
			</li>
		{/each}
	</ul>

	<!-- <button on:click={addPlayerModal.showModal()} id="add-player" class="btn btn-primary btn-square btn-lg">
        <Plus />
    </button> -->
</main>

<dialog id="addPlayerModal" class="modal modal-bottom">
	<div class="modal-box p-8">
		<h3>Add Player</h3>
		<div class="flex flex-col gap-4 py-8">
			<label class="floating-label">
				<span>Name *</span>
				<input
					type="text"
					placeholder="Name*"
					class="input input-lg w-full"
					bind:value={newPlayerName}
				/>
			</label>
			<label class="floating-label">
				<span>Blacklist roles</span>
				<input
					type="text"
					placeholder="Blacklist roles"
					class="input input-lg w-full"
					bind:value={newPlayerBlacklist}
				/>
			</label>
		</div>
		<div class="modal-action">
			<form method="dialog">
				<button class="btn btn-square btn-lg">
					<ArrowLeft />
				</button>
			</form>

			<button class="btn btn-primary btn-square btn-lg" on:click={createNewPlayer}>
				<Save />
			</button>
		</div>
	</div>
</dialog>

<style>
	main {
		height: 100%;
		position: relative;
	}

	#add-player {
		bottom: 0;
		position: absolute;
		right: 0;
	}
</style>
