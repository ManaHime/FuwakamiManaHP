<script lang="ts">
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import { LightSwitch, drawerStore } from '@skeletonlabs/skeleton';
	function closeDrawer() {
		drawerStore.close();
	}
	export let translation: any;
	$: classesActive = (href: string) => ((href) === $page.url.pathname ? '!variant-soft-primary' : '');
</script>

{#if translation}
	<nav class="p-4 list-nav">
		<ul>
			<li><a href="{translation.langParam}/" class={classesActive(translation.langParam + '')} on:click={closeDrawer}>{translation.home}</a></li>
			<li>
				<a href="{translation.langParam}/blog" class={classesActive(translation.langParam + '/blog')} on:click={closeDrawer}>{translation.blog}</a>
			</li>
			<li>
				<a href="{translation.langParam}/wiki" class={classesActive(translation.langParam + '/wiki')} on:click={closeDrawer}>{translation.wiki}</a>
			</li>
			<li>
				<a href="{translation.langParam}/portfolio" class={classesActive(translation.langParam + '/portfolio')} on:click={closeDrawer}
					>{translation.portfolio}</a
				>
			</li>
			<li>
				<a href="{translation.langParam}/contact" class={classesActive(translation.langParam + '/contact')} on:click={closeDrawer}
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
					<a href="{translation.langParam}/login" class={classesActive('/login')} on:click={closeDrawer}
						>{translation.login}</a
					>
				</li>
				<li>
					<a href="{translation.langParam}/register" class={classesActive('/register')} on:click={closeDrawer}
						>{translation.register}</a
					>
				</li>
			{/if}
			{#if $page.data.user}
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
			{/if}
			<li><LightSwitch on:click={closeDrawer} /></li>
		</ul>
	</nav>
{/if}
