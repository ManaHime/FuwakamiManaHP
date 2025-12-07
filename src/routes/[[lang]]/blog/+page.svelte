<script lang="ts">
	import { page } from '$app/stores';
	import TipTapRenderer from '$lib/components/TipTapRenderer.svelte';
	import { Dialog, Portal } from '@skeletonlabs/skeleton-svelte';
	let { data } = $props();

	let posts = $derived(data.posts);
	let confirmDialogOpen = $state(false);
	let pendingPostId = $state<string | null>(null);
	let pendingAuthorId = $state<string | null>(null);

	function openConfirmDialog(postId: string, authorId: string) {
		pendingPostId = postId;
		pendingAuthorId = authorId;
		confirmDialogOpen = true;
	}

	async function handleConfirm() {
		if (pendingPostId && pendingAuthorId) {
			const res = await fetch('/api/posts', {
				method: 'DELETE',
				headers: {
					'content-type': 'application/json',
					Authorization: pendingAuthorId
				},
				credentials: 'include', // Include cookies for session authentication
				body: JSON.stringify({
					postId: pendingPostId
				})
			});
			let formatedResponse = await res.json();
			if (formatedResponse.message === 'Success') {
				const index = posts.map((e) => e._id).indexOf(pendingPostId);
				posts.splice(index, 1);
			}
		}
		confirmDialogOpen = false;
		pendingPostId = null;
		pendingAuthorId = null;
	}

	function handleCancel() {
		confirmDialogOpen = false;
		pendingPostId = null;
		pendingAuthorId = null;
	}
</script>

<!-- Confirmation Dialog -->
<Dialog open={confirmDialogOpen} onOpenChange={(details) => (confirmDialogOpen = details.open)}>
	<Dialog.Trigger class="hidden" />
	<Portal>
		<Dialog.Backdrop class="fixed inset-0 z-50 bg-surface-50-950/50" />
		<Dialog.Positioner class="fixed inset-0 z-50 flex justify-center items-center">
			<Dialog.Content class="card bg-surface-100-900 w-md p-4 space-y-4 shadow-xl">
				<Dialog.Title class="text-2xl font-bold">Please Confirm</Dialog.Title>
				<Dialog.Description>Are you sure you wish to proceed?</Dialog.Description>
				<footer class="flex justify-end gap-2">
					<button type="button" class="btn preset-tonal" onclick={handleCancel}>Cancel</button>
					<button type="button" class="btn preset-filled" onclick={handleConfirm}>Confirm</button>
				</footer>
			</Dialog.Content>
		</Dialog.Positioner>
	</Portal>
</Dialog>

<div class="flex flex-col-reverse gap-5 place-items-center 2xl:mr-52">
	{#each posts as post (post._id)}
		<div class="w-full max-w-7xl p-5 prose xl:prose-2xl card">
			<div class="flex place-content-between">
				<h1 class="flex content-between text-4xl card-header">{post.title}</h1>
				{#if $page.data.user?.userId === post.authorId}
					<div>
						<button
							class="btn preset-tonal-primary"
							name="testVal"
							onclick={() => openConfirmDialog(post._id, $page.data.user.userId)}>X</button
						>
					</div>
				{/if}
			</div>
			<div class="flex gap-5 mx-5">
				<p class="text-xs!">Author: {post.author}</p>
				<p class="text-xs!">Posted on: {post.date}</p>
			</div>
			<div class="p-5 card preset-tonal">
				<TipTapRenderer content={post.content} />
			</div>
		</div>
	{/each}
</div>
