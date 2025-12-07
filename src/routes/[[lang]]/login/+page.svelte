<script lang="ts">
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';

	let { form, data }: { form: ActionData; data: any } = $props();
	let translation = $derived(data.translation);
</script>

<div class="flex flex-wrap h-full place-content-center 2xl:mr-52">
	<div class="flex flex-row items-center h-full max-w-sm">
		<div class="flex flex-col justify-around px-8 pb-8 card gap">
			<h1 class="p-8 text-center uppercase h1">{translation.title}</h1>
			<form class="flex flex-col gap-4" method="POST" use:enhance>
				<div class="p-4 space-y-4 border border-surface-500 rounded-container">
					<input
						name="email"
						type="email"
						placeholder={translation.email}
						class="rounded-md input"
					/>
					<input
						name="password"
						type="password"
						placeholder={translation.password}
						class="rounded-md input"
					/>
					{#if form?.invalid}
						<p class="error">Username and password is required.</p>
					{/if}
					{#if form?.credentials}
						<p class="error">You have entered the wrong credentials.</p>
					{/if}
				</div>
				<button type="submit" class="rounded-md btn preset-tonal-primary"
					>{translation.submit}</button
				>
			</form>
		</div>
	</div>
</div>
