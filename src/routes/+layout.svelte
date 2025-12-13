<script lang="ts">
	// Most of your app wide CSS should be put in this file
	import './layout.css';
	import { page } from '$app/stores';
	import { AppBar, Avatar, Dialog, Portal, Popover } from '@skeletonlabs/skeleton-svelte';
	import Navigation from '$lib/components/Navigation.svelte';
	import { enhance } from '$app/forms';
	import { XIcon } from '@lucide/svelte';

	let { data, children } = $props();

	let translation = $derived(data.translation);
	let drawerOpen = $state(false);

	const getUserInitial = () => {
		if (data.user) {
			return data.user.name
				.split(' ')
				.map((n) => n[0])
				.join('');
		}
		return '';
	};
</script>

<!-- Drawer using Dialog -->
<Dialog open={drawerOpen} onOpenChange={(details) => (drawerOpen = details.open)}>
	<Dialog.Trigger class="hidden" />
	<Portal>
		<Dialog.Backdrop
			class="fixed inset-0 z-50 bg-surface-50-950/50 transition transition-discrete opacity-0 starting:data-[state=open]:opacity-0 data-[state=open]:opacity-100"
		/>
		<Dialog.Positioner class="fixed inset-0 z-50 flex justify-start">
			<Dialog.Content
				class="h-screen card bg-surface-100-900 w-sm p-4 space-y-4 shadow-xl transition transition-discrete opacity-0 -translate-x-full starting:data-[state=open]:opacity-0 starting:data-[state=open]:-translate-x-full data-[state=open]:opacity-100 data-[state=open]:translate-x-0"
			>
				<header class="flex justify-between items-center">
					<Dialog.Title class="text-2xl font-bold">Menu</Dialog.Title>
					<Dialog.CloseTrigger class="btn-icon preset-tonal">
						<XIcon class="size-4" />
					</Dialog.CloseTrigger>
				</header>
				<Navigation bind:translation onClose={() => (drawerOpen = false)} />
			</Dialog.Content>
		</Dialog.Positioner>
	</Portal>
</Dialog>

<!-- Main Layout -->
<div class="flex flex-col min-h-screen">
	<!-- Header with AppBar -->
	<AppBar>
		<AppBar.Toolbar class="grid-cols-[auto_1fr_auto]">
			<AppBar.Lead>
				<button
					type="button"
					class="mr-4 md:hidden btn-icon btn-icon-lg hover:preset-tonal"
					onclick={() => (drawerOpen = true)}
					aria-label="Open menu"
				>
					<svg viewBox="0 0 100 80" class="w-4 h-4 fill-token">
						<rect width="100" height="20" />
						<rect y="30" width="100" height="20" />
						<rect y="60" width="100" height="20" />
					</svg>
				</button>
			</AppBar.Lead>
			<AppBar.Headline>
				<p class="text-2xl">ふわかみ・まな</p>
			</AppBar.Headline>
			<AppBar.Trail>
				{#if $page.data.user}
					<Popover>
						<Popover.Trigger class="rounded-full">
							{#if $page.data.user.avatar}
								<Avatar class="size-10">
									<Avatar.Image src={$page.data.user.avatar} alt={$page.data.user.name} />
									<Avatar.Fallback>{getUserInitial()}</Avatar.Fallback>
								</Avatar>
							{:else}
								<Avatar class="size-10 bg-primary-500">
									<Avatar.Fallback>{getUserInitial()}</Avatar.Fallback>
								</Avatar>
							{/if}
						</Popover.Trigger>
						<Portal>
							<Popover.Positioner>
								<Popover.Content class="w-48 py-2 shadow-xl card bg-surface-100-900">
									<ul class="list-nav">
										<li>
											<a href="/profile" class="rounded-md">Profile</a>
										</li>
										<li>
											<form action="/logout" method="POST" use:enhance>
												<button class="w-full rounded-md" type="submit">{translation.logout}</button
												>
											</form>
										</li>
									</ul>
								</Popover.Content>
							</Popover.Positioner>
						</Portal>
					</Popover>
				{:else}
					<a href="/login" class="btn preset-filled-primary">Login</a>
				{/if}
			</AppBar.Trail>
		</AppBar.Toolbar>
	</AppBar>

	<!-- Main Content Area -->
	<div class="flex flex-1">
		<!-- Sidebar (Hidden below md breakpoint) -->
		<aside id="sidebar-left" class="hidden md:block w-52 bg-surface-500/10">
			<Navigation bind:translation />
		</aside>

		<!-- Page Content -->
		<main class="flex-1">
			{@render children?.()}
		</main>
	</div>

	<!-- Footer -->
	<footer class="p-2 text-sm text-center opacity-50 2xl:mr-52">
		<p>©2023-{new Date().getFullYear()} Fuwakami Mana. All rights reserved.</p>
	</footer>
</div>
