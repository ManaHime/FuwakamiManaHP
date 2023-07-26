<script lang="ts">
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import { LightSwitch, drawerStore } from '@skeletonlabs/skeleton';

	function closeDrawer() {
		drawerStore.close();
	}
	$: classesActive = (href: string) => (href === $page.url.pathname ? '!variant-soft-primary' : '');

	export let translation;
</script>

{#if translation}
	<nav class="p-4 list-nav">
		<ul>
			<li><a href="/" class={classesActive('/')} on:click={closeDrawer}>{translation.home}</a></li>
			<li>
				<a href="/blog" class={classesActive('/blog')} on:click={closeDrawer}>{translation.blog}</a>
			</li>
			<li>
				<a href="/wiki" class={classesActive('/wiki')} on:click={closeDrawer}>{translation.wiki}</a>
			</li>
			<li>
				<a href="/portfolio" class={classesActive('/portfolio')} on:click={closeDrawer}
					>{translation.portfolio}</a
				>
			</li>
			<li>
				<a href="/contact" class={classesActive('/contact')} on:click={closeDrawer}
					>{translation.contact}</a
				>
			</li>
		</ul>
		<hr />
		<ul>
			<li>
				<a href="https://twitter.com/FuwakamiMana" on:click={closeDrawer}>{translation.twitter}</a>
			</li>
			<li>
				<a href="https://www.youtube.com/@FuwakamiMana" on:click={closeDrawer}
					>{translation.youtube}</a
				>
			</li>
			<li>
				<a href="https://discord.gg/FDymkDsaxk" on:click={closeDrawer}>{translation.discord}</a>
			</li>
		</ul>
		<hr />
		<ul>
			{#if !$page.data.user}
				<li>
					<a href="/login" class={classesActive('/login')} on:click={closeDrawer}
						>{translation.login}</a
					>
				</li>
				<li>
					<a href="/register" class={classesActive('/register')} on:click={closeDrawer}
						>{translation.register}</a
					>
				</li>
			{/if}
			{#if $page.data.user}
				<li>
					{#if $page.data.user.role === 'admin'}
						<li>
							<a href="/admin" class={classesActive('/admin')} on:click={closeDrawer}
								>{translation.admin}</a
							>
						</li>
					{/if}
					<form action="/logout" method="POST" use:enhance>
						<button class="w-full" type="submit" on:click={closeDrawer}>{translation.logout}</button
						>
					</form>
				</li>
			{/if}
			<li><LightSwitch on:click={closeDrawer} /></li>
		</ul>
	</nav>
{/if}
