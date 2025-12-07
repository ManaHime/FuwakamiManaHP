<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton-svelte';

	let { data } = $props();
	let user = $derived(data.user);
</script>

<div class="flex flex-col gap-5 py-10 place-items-center 2xl:mr-52">
	<div class="flex w-full max-w-7xl p-5 place-content-center card">
		<div class="flex flex-col w-full max-w-3xl">
			<h1 class="h1 pb-10">Profile</h1>
			<div class="flex place-content-around w-full">
				{#if user}
					<Avatar
						class="w-32 rounded-full border-4 border-surface-300-700 hover:border-primary-500! cursor-pointer"
					>
						<Avatar.Image src={user.avatar} alt={user.name} />
						<Avatar.Fallback>{user.name.charAt(0).toUpperCase()}</Avatar.Fallback>
					</Avatar>
					<h1 class="h1 self-center">{user.name}</h1>
				{/if}
			</div>
		</div>
	</div>
</div>
