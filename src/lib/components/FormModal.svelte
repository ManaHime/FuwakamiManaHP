<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';

	// Props
	/** Exposes parent props to this component. */
	export let parent: any;

	// Stores

	const modalStore = getModalStore();

	// Form Data
	const formData = $modalStore[0].meta;

	// Base Classes
	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';
</script>

{#if $modalStore[0]}
	<div class="modal-example-form {cBase}">
		<header class={cHeader}>{$modalStore[0].title ?? '(title missing)'}</header>
		<article>{$modalStore[0].body ?? '(body missing)'}</article>
		<!-- Enable for debugging: -->
		<form method="post" action="/admin/users/">
			<div class="modal-form {cForm}">
				<label class="label">
					<span>ユーザーネーム</span>
					<input
						class="input"
						type="text"
						name="username"
						bind:value={formData.userName}
						placeholder="ユーザーネーム"
					/>
				</label>
				<label class="label">
					<span>eメール</span>
					<input
						class="input"
						type="email"
						name="email"
						bind:value={formData.email}
						placeholder="eメール"
					/>
				</label>
				<label class="label">
					<span>ロール</span>
					<select class="select" name="role" bind:value={formData.role}>
						<option value="admin">admin</option>
						<option value="user">user</option>
					</select>
				</label>
			</div>
			<footer class="modal-footer {parent.regionFooter} pt-4">
				<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}
					>{parent.buttonTextCancel}</button
				>
				<button
					class="btn {parent.buttonPositive}"
					name="userId"
					value={formData.userId}
					type="submit">Submit</button
				>
			</footer>
		</form>
	</div>
{/if}
