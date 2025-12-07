<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types.js';
	import FormModal from '$lib/components/FormModal.svelte';
	let { data }: { data: PageData } = $props();

	let userTable = $derived(data.userTable);
	let modalOpen = $state(false);
	let selectedUser = $state<{
		userId: string;
		userName: string;
		email: string;
		role: string;
		avatar: string;
	} | null>(null);

	function openModal(userRow: string[]) {
		if (userRow.length !== 5) {
			console.error('Invalid user row');
			return;
		}
		const [userId, userName, email, role, avatar] = userRow;
		selectedUser = { userId, userName, email, role, avatar };
		modalOpen = true;
	}

	function closeModal() {
		modalOpen = false;
		selectedUser = null;
	}

	function handleSubmit() {
		// Form submission is handled by the form action
		// This will trigger a page reload
	}
</script>

{#if $page.data.user?.role === 'admin' && userTable}
	<div class="flex flex-col-reverse gap-5 place-items-center 2xl:mr-52">
		<div class="w-full max-w-3xl p-5">
			<div class="table-wrap">
				<table class="table table-auto">
					<thead>
						<tr>
							{#each userTable.head as header}
								<th>{header}</th>
							{/each}
						</tr>
					</thead>
					<tbody>
						{#each userTable.body as row}
							<tr class="cursor-pointer hover:preset-tonal-primary" onclick={() => openModal(row)}>
								{#each row as cell}
									<td>{cell}</td>
								{/each}
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
	<FormModal
		bind:open={modalOpen}
		userData={selectedUser ?? undefined}
		onClose={closeModal}
		onSubmit={handleSubmit}
	/>
{/if}
