<script lang="ts">
	import { page } from '$app/stores';
	import { Tabs } from '@skeletonlabs/skeleton-svelte';
</script>

{#if $page.data.user.role === 'admin'}
	<Tabs>
		<Tabs.Control href="/admin" selected={$page.url.pathname === '/admin'}>Admin</Tabs.Control>
		<Tabs.Control href="/admin/new-post" selected={$page.url.pathname === '/admin/new-post'}
			>Blog</Tabs.Control
		>
		<Tabs.Control href="/admin/users" selected={$page.url.pathname === '/admin/users'}>Users</Tabs.Control
		>
		<Tabs.Control href="/admin/discord-bot" selected={$page.url.pathname === '/admin/discord-bot'}
			>Discord Bot</Tabs.Control
		>
	</Tabs>
	<slot />
{/if}
