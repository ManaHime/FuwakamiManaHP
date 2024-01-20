<script lang="ts">
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { page } from '$app/stores';
	import {
		AppBar,
		AppShell,
		Avatar,
		Drawer,
		Modal,
		getDrawerStore,
		initializeStores,
		popup
	} from '@skeletonlabs/skeleton';
	import Navigation from '$lib/components/Navigation.svelte';
	import type { PopupSettings } from '@skeletonlabs/skeleton';

	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { enhance } from '$app/forms';

	initializeStores();
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	export let data;
	const drawerStore = getDrawerStore();

	let translation: any = 'test';
	$: translation = data.translation;
	function drawerOpen(): void {
		drawerStore.open();
	}

	const avatarMenuPopup: PopupSettings = {
		event: 'focus-click',
		target: 'avatarMenuPopup',
		placement: 'bottom',
		closeQuery: '.listbox-item'
	};
</script>

<Modal />

<Drawer>
	<Navigation bind:translation />
</Drawer>

<AppShell slotSidebarLeft="w-0 md:w-52 bg-surface-500/10">
	<svelte:fragment slot="header">
		<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
			<svelte:fragment slot="lead">
				<button class="mr-4 md:hidden btn btn-sm" on:click={drawerOpen}>
					<span>
						<svg viewBox="0 0 100 80" class="w-4 h-4 fill-token">
							<rect width="100" height="20" />
							<rect y="30" width="100" height="20" />
							<rect y="60" width="100" height="20" />
						</svg>
					</span>
				</button>
			</svelte:fragment>
			ふわかみ・まな
			<svelte:fragment slot="trail">
				{#if $page.data.user}
					<button class="rounded-full" use:popup={avatarMenuPopup}>
						<Avatar width="w-10" initials="まな" background="bg-primary-500" />
					</button>
					<div class="w-48 py-2 shadow-xl card" data-popup="avatarMenuPopup">
						<ul class="list-nav">
							<li>
								<form action="/logout" method="POST" use:enhance>
									<button class="w-full !rounded-md" type="submit">{translation.logout}</button>
								</form>
							</li>
						</ul>
					</div>
				{:else}
					<a href="/login" class="btn variant-filled-primary">Login</a>
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<!-- Hidden below Tailwind's large breakpoint -->
		<div id="sidebar-left" class="hidden md:block">
			<Navigation bind:translation />
		</div>
	</svelte:fragment>
	<svelte:fragment slot="pageFooter"
		><p class="p-2 text-sm text-center opacity-50 2xl:mr-52">
			©2023 Fuwakami Mana. All rights reserved.
		</p></svelte:fragment
	>
	<slot />
</AppShell>
