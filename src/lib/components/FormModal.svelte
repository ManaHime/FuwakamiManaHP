<script lang="ts">
	import { Dialog, Portal } from '@skeletonlabs/skeleton-svelte';
	import { XIcon } from '@lucide/svelte';

	let {
		open = $bindable(false),
		userData,
		onClose,
		onSubmit
	}: {
		open: boolean;
		userData?: { userId: string; userName: string; email: string; role: string; avatar: string };
		onClose?: () => void;
		onSubmit?: () => void;
	} = $props();

	let formData = $state({
		userName: '',
		email: '',
		role: 'user',
		avatar: ''
	});

	$effect(() => {
		if (userData) {
			formData.userName = userData.userName;
			formData.email = userData.email;
			formData.role = userData.role;
			formData.avatar = userData.avatar;
		}
	});

	function handleClose() {
		open = false;
		onClose?.();
	}

	function handleSubmit() {
		onSubmit?.();
		handleClose();
	}

	// Base Classes
	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container';
</script>

<Dialog {open} onOpenChange={(details) => (open = details.open)}>
	<Portal>
		<Dialog.Backdrop class="fixed inset-0 z-50 bg-surface-50-950/50" />
		<Dialog.Positioner class="fixed inset-0 z-50 flex justify-center items-center p-4">
			<Dialog.Content class="card bg-surface-100-900 w-full max-w-xl p-4 space-y-4 shadow-xl">
				<header class="flex justify-between items-center">
					<Dialog.Title class={cHeader}>ユーザーアップデート</Dialog.Title>
					<Dialog.CloseTrigger class="btn-icon hover:preset-tonal" onclick={handleClose}>
						<XIcon class="size-4" />
					</Dialog.CloseTrigger>
				</header>
				<form method="post" action="/admin/users/" onsubmit={handleSubmit}>
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
						<label class="label">
							<span>アバター</span>
							<input
								class="input"
								type="text"
								name="avatar"
								bind:value={formData.avatar}
								placeholder="アバター"
							/>
						</label>
					</div>
					<footer class="modal-footer pt-4 flex justify-end gap-2">
						<Dialog.CloseTrigger class="btn preset-tonal" onclick={handleClose}
							>Cancel</Dialog.CloseTrigger
						>
						<button
							class="btn preset-filled"
							name="userId"
							value={userData?.userId ?? ''}
							type="submit">Submit</button
						>
					</footer>
				</form>
			</Dialog.Content>
		</Dialog.Positioner>
	</Portal>
</Dialog>
