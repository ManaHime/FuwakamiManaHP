<script lang="ts">
	import { page } from '$app/stores';
	import { Table, tableMapperValues, tableSourceValues } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types.js';
	import type { TableSource } from '@skeletonlabs/skeleton';
	import ModalAdminUserEditForm from '$lib/components/FormModal.svelte';
	import { Modal, modalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';
	export let data: PageData;

	$: ({ userTable } = data);

	function modalAdminUserEditForm(meta: any): void {
		const editableUser = {
			userId: meta.detail['0'],
			userName: meta.detail['1'],
			email: meta.detail['2'],
			role: meta.detail['3']
		};
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
