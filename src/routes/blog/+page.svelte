<script lang="ts">
	import { page } from '$app/stores';
	import { modalStore } from '@skeletonlabs/skeleton';
	export let data;

	$: ({ posts } = data);

	const getConfirmModalTriger = (postId: string, authorId: string) => {
		return () =>
			modalStore.trigger({
				type: 'confirm',
				title: 'Please Confirm',
				body: 'Are you sure you wish to proceed?',
				response: async (r) => {
					if (r) {
						const res = await fetch('/api/posts', {
							method: 'DELETE',
							headers: {
								'content-type': 'application/json',
								authorization: authorId
							},
							body: JSON.stringify({
								postId
							})
						});
						let formatedResponse = await res.json();
						if (formatedResponse.message === 'Success') {
							const index = posts.map((e) => e._id).indexOf(postId);
							posts.splice(index, 1);
							posts = posts;
						}
					}
				}
			});
	};
</script>

<div class="flex flex-col-reverse gap-5 place-items-center 2xl:mr-52">
	{#each posts as post}
		<div class="w-full max-w-screen-xl p-5 prose xl:prose-2xl card">
			<div class="flex place-content-between">
				<h2 class="flex content-between text-4xl card-header h2">{post.title}</h2>
				{#if $page.data.user?.userId === post.authorId}
					<div>
						<button
							class="btn variant-soft-primary"
							name="testVal"
							on:click={getConfirmModalTriger(post._id, $page.data.user.userId)}>X</button
						>
					</div>
				{/if}
			</div>
			<div class="mx-5">
				<p class="flex flex-1">Author: {post.author}</p>
				<p><small>Posted on: {post.date}</small></p>
			</div>
			<div class="p-5 card variant-soft whitespace-break-spaces">{@html post.content}</div>
		</div>
	{/each}
</div>
