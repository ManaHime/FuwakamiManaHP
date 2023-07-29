<script lang="ts">
	import { page } from '$app/stores';
	import { TabGroup, TabAnchor } from '@skeletonlabs/skeleton';
</script>

{#if $page.data.user.role === 'admin'}
	<TabGroup>
		<TabAnchor href="/admin" selected={$page.url.pathname === '/admin'}>Admin</TabAnchor>
		<TabAnchor href="/admin/new-post" selected={$page.url.pathname === '/admin/new-post'}
			>Blog</TabAnchor
		>
		<TabAnchor href="/admin/users" selected={$page.url.pathname === '/admin/users'}>Users</TabAnchor
		>
		<TabAnchor href="/admin/discord-bot" selected={$page.url.pathname === '/admin/discord-bot'}>Discord Bot</TabAnchor
			>
	</TabGroup>
	<slot />
{/if}
