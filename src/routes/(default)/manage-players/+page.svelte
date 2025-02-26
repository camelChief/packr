<script lang="ts">
	import { Player } from '$lib/models/player';
	import { createPlayer, deletePlayer, getPlayers } from '$lib/services/player-service';
	import { eventStore } from '$lib/stores';
	import { ArrowLeft, Pencil, PencilRuler, Save, Settings2, User, X } from 'lucide-svelte';
	import { onMount } from 'svelte';

	let players: Player[];
	let newPlayerName = '';
	let newPlayerBlacklist = '';

	onMount(async () => {
		players = await getPlayers();
		eventStore.subscribe((event) => {
			if (event === 'openAddPlayerModal') {
				eventStore.set('');
				addPlayerModal.showModal();
			}
		});
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

	async function removePlayer(name: string) {
		await deletePlayer(name);
		players = await getPlayers();
	}
</script>

{#if players?.length}
	<ul class="list">
		{#each players as player}
			<li class="list-row items-center">
				<User />
				{player.name}
				<div>
					<button class="btn btn-square btn-sm">
						<Settings2 />
					</button>
					<button
						class="btn btn-square btn-sm btn-error btn-soft"
						on:click={() => removePlayer(player.name)}
					>
						<X />
					</button>
				</div>
			</li>
		{/each}
	</ul>
{:else}
	<!-- todo: upgrade this with an image :) -->
	<div class="empty">
		No players found!
		<br />Use the + button below to add players.
	</div>
{/if}

<!-- todo: deal with this -->
<dialog id="addPlayerModal" class="modal">
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
	.empty {
		align-items: center;
		display: flex;
		height: 100%;
		text-align: center;
	}
</style>
