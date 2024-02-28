<script lang="ts">
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import { LightSwitch, getDrawerStore } from '@skeletonlabs/skeleton';

	interface NavTranslation {
		lang: string;
		home: string;
        chattori: string;
		blog: string;
		wiki: string;
		portfolio: string;
		university: string;
		contact: string;
		twitter: string;
		youtube: string;
		livestream: string;
		odderotter: string;
		discord: string;
		login: string;
		register: string;
		admin: string;
		logout: string;
	}

	const drawerStore = getDrawerStore();

	function closeDrawer() {
		drawerStore.close();
	}
	export let translation: NavTranslation;
	$: classesActive = (href: string) => (href === $page.url.pathname ? '!variant-soft-primary' : '');
	$: langPageSwitch = $page.url.pathname.split(translation.lang);
</script>

{#key $page.params}
	<nav class="p-4 list-nav">
		<ul>
			<li>
				<a
					href="/{translation.lang}"
					class={classesActive('/' + translation.lang + '')}
					on:click={closeDrawer}>{translation.home}</a
				>
			</li>
            <li>
                <a
                    href="/{translation.lang}/chattori"
                    class={classesActive('/' + translation.lang + '/chattori')}
                    on:click={closeDrawer}>{translation.chattori}</a
                >
			<li>
				<a
					href="/{translation.lang}/blog"
					class={classesActive('/' + translation.lang + '/blog')}
					on:click={closeDrawer}>{translation.blog}</a
				>
			</li>
			<li>
				<a
					href="/{translation.lang}/wiki"
					class={classesActive('/' + translation.lang + '/wiki')}
					on:click={closeDrawer}>{translation.wiki}</a
				>
			</li>
			<li>
				<a
					href="/{translation.lang}/portfolio"
					class={classesActive('/' + translation.lang + '/portfolio')}
					on:click={closeDrawer}>{translation.portfolio}</a
				>
			</li>
			<li>
				<a
					href="/{translation.lang}/school"
					class={classesActive('/' + translation.lang + '/contact')}
					on:click={closeDrawer}>{translation.university}</a
				>
			</li>
			<li>
				<a
					href="/{translation.lang}/contact"
					class={classesActive('/' + translation.lang + '/contact')}
					on:click={closeDrawer}>{translation.contact}</a
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
				<a href="/{translation.lang}/live-stream">{translation.livestream}</a>
			</li>
			<li>
				<a href="/{translation.lang}/odderotter">{translation.odderotter}</a>
			</li>
			<li>
				<a href="https://discord.gg/FDymkDsaxk" on:click={closeDrawer}>{translation.discord}</a>
			</li>
		</ul>
		<hr />
		<ul>
			{#if !$page.data.user}
				<li>
					<a
						href="/{translation.lang}/login"
						class={'/' + classesActive('/login')}
						on:click={closeDrawer}>{translation.login}</a
					>
				</li>
				<li>
					<a
						href="/{translation.lang}/register"
						class={'/' + classesActive('/register')}
						on:click={closeDrawer}>{translation.register}</a
					>
				</li>
			{/if}
			{#if $page.data.user}
				{#if $page.data.user.role === 'admin'}
					<li>
						<a href="/admin" class={'/' + classesActive('/admin')} on:click={closeDrawer}
							>{translation.admin}</a
						>
					</li>
				{/if}
				<form action="/logout" method="POST" use:enhance>
					<button class="w-full" type="submit" on:click={closeDrawer}>{translation.logout}</button>
				</form>
			{/if}
			{#if translation.lang === 'ja'}
				<li>
					<a href="/en{langPageSwitch[1] ?? $page.url.pathname}" on:click={closeDrawer}>English</a>
				</li>
			{:else}
				<li><a href="/ja{langPageSwitch[1]}" on:click={closeDrawer}>日本語</a></li>
			{/if}

			<li><LightSwitch on:click={closeDrawer} /></li>
		</ul>
	</nav>
{/key}
