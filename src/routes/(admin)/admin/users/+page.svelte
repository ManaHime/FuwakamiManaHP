<script lang="ts">
	import { page } from '$app/stores';
	import { Table, getModalStore } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types.js';
	import ModalAdminUserEditForm from '$lib/components/FormModal.svelte';
	import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';
	export let data: PageData;

	$: ({ userTable } = data);

	const modalStore = getModalStore();

	function modalAdminUserEditForm(e: CustomEvent<string[]>): void {
		const metaDetail = e.detail;
		if (metaDetail.length !== 5) {
			console.error('Invalid meta detail');
			return;
		}
		const [userId, userName, email, role, avatar] = metaDetail;
		const editableUser = { userId, userName, email, role, avatar };

		const c: ModalComponent = { ref: ModalAdminUserEditForm };
		const modal: ModalSettings = {
			type: 'component',
			component: c,
			title: 'ユーザーアップデート',
			body: '',
			meta: editableUser
		};
		modalStore.trigger(modal);
	}
</script>

{#if $page.data.user?.role === 'admin' && userTable}
	<div class="flex flex-col-reverse gap-5 place-items-center 2xl:mr-52">
		<div class="w-full max-w-screen-md p-5">
			<Table source={userTable} interactive={true} on:selected={modalAdminUserEditForm} />
		</div>
	</div>
{/if}
