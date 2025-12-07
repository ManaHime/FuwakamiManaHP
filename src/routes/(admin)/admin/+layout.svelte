<script lang="ts">
	import { page } from '$app/stores';

	const isActive = (path: string) => {
		return $page.url.pathname === path;
	};
</script>

{#if $page.data.user.role === 'admin'}
	<nav class="border-b border-surface-500">
		<ul class="flex gap-0">
			<li>
				<a
					href="/admin"
					class="btn btn-ghost rounded-none border-b-2 {isActive('/admin')
						? 'border-primary-500 preset-tonal-primary'
						: 'border-transparent hover:border-surface-500'}">Admin</a
				>
			</li>
			<li>
				<a
					href="/admin/new-post"
					class="btn btn-ghost rounded-none border-b-2 {isActive('/admin/new-post')
						? 'border-primary-500 preset-tonal-primary'
						: 'border-transparent hover:border-surface-500'}">Blog</a
				>
			</li>
			<li>
				<a
					href="/admin/users"
					class="btn btn-ghost rounded-none border-b-2 {isActive('/admin/users')
						? 'border-primary-500 preset-tonal-primary'
						: 'border-transparent hover:border-surface-500'}">Users</a
				>
			</li>
			<li>
				<a
					href="/admin/discord-bot"
					class="btn btn-ghost rounded-none border-b-2 {isActive('/admin/discord-bot')
						? 'border-primary-500 preset-tonal-primary'
						: 'border-transparent hover:border-surface-500'}">Discord Bot</a
				>
			</li>
		</ul>
	</nav>
	<slot />
{/if}
