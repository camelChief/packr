<script lang="ts">
	import { createPlayer, deletePlayer, getPlayers } from '$lib/services/player-service';
	import { eventStore } from '$lib/stores';
	import { ArrowLeft, Plus, User, X } from 'lucide-svelte';
	import { onMount } from 'svelte';

	let players: string[] = [];
	let newPlayer = '';

	async function removePlayer(player: string) {
		await deletePlayer(player);
		players = players.filter((p) => p !== player);
	}

	async function closeModal() {
		newPlayer = '';
		addPlayerModal.close();
	}

	async function addPlayer() {
		await createPlayer(newPlayer);
		players = [...players, newPlayer].sort();
		newPlayer = '';
		addPlayerModal.close();
	}

	onMount(async () => {
		players = await getPlayers();
		eventStore.subscribe((event) => {
			if (event === 'openAddPlayerModal') {
				eventStore.set('');
				addPlayerModal.showModal();
			}
		});
	});
</script>

{#if players?.length}
	<main>
		<p class="pb-8">
			Add players here to save them for easy inclusion in future games. All data is saved locally to
			your device.
		</p>
		<ul class="list rounded-box border-base-content/10 border-1">
			{#each players as player}
				<li class="list-row items-center">
					<User />
					{player}
					<button
						onclick={() => removePlayer(player)}
						class="btn btn-square btn-sm btn-error btn-soft"
					>
						<X />
					</button>
				</li>
			{/each}
		</ul>
	</main>
{:else}
	<!-- todo: upgrade this with an image -->
	<p class="no-players">
		No players found!
		<br />Use the + button below to add players.
	</p>
{/if}

<!-- todo: make modal display without hiding behind text -->
<!-- and without needing to set it to modal-top -->
<dialog id="addPlayerModal" class="modal">
	<div class="modal-box p-8">
		<h3>Add Player</h3>
		<label class="floating-label my-8">
			<span>Name</span>
			<input type="text" placeholder="Name" bind:value={newPlayer} class="input w-full" />
		</label>
		<div class="modal-action">
			<button onclick={closeModal} class="btn btn-square">
				<ArrowLeft />
			</button>
			<button onclick={addPlayer} class="btn btn-square btn-success">
				<Plus />
			</button>
		</div>
	</div>
</dialog>

<style>
	.no-players {
		align-items: center;
		display: flex;
		height: 100%;
		text-align: center;
	}
</style>
