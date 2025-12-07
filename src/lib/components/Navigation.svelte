<script lang="ts">
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';

	interface NavTranslation {
		lang: string;
		home: string;
		story: string;
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

	let {
		translation = $bindable(),
		onClose
	}: { translation: NavTranslation; onClose?: () => void } = $props();

	function closeDrawer() {
		onClose?.();
	}

	const classesActive = $derived.by(
		() => (href: string) => (href === $page.url.pathname ? '!preset-tonal-primary' : '')
	);
	const langPageSwitch = $derived($page.url.pathname.replace(`/${translation.lang}`, '') || '/');
</script>

{#key $page.params}
	<nav class="p-4 list-nav">
		<ul>
			<li>
				<a
					href="/{translation.lang}"
					class={classesActive('/' + translation.lang + '')}
					onclick={closeDrawer}>{translation.home}</a
				>
			</li>
			<li>
				<a
					href="/{translation.lang}/story"
					class={classesActive('/' + translation.lang + '/story')}
					onclick={closeDrawer}>{translation.story}</a
				>
			</li>
			<li>
				<a
					href="/{translation.lang}/chattori"
					class={classesActive('/' + translation.lang + '/chattori')}
					onclick={closeDrawer}>{translation.chattori}</a
				>
			</li>
			<li>
				<a
					href="/{translation.lang}/blog"
					class={classesActive('/' + translation.lang + '/blog')}
					onclick={closeDrawer}>{translation.blog}</a
				>
			</li>
			<li>
				<a
					href="/{translation.lang}/wiki"
					class={classesActive('/' + translation.lang + '/wiki')}
					onclick={closeDrawer}>{translation.wiki}</a
				>
			</li>
			<li>
				<a
					href="/{translation.lang}/portfolio"
					class={classesActive('/' + translation.lang + '/portfolio')}
					onclick={closeDrawer}>{translation.portfolio}</a
				>
			</li>
			<li>
				<a
					href="/{translation.lang}/school"
					class={classesActive('/' + translation.lang + '/contact')}
					onclick={closeDrawer}>{translation.university}</a
				>
			</li>
			<li>
				<a
					href="/{translation.lang}/contact"
					class={classesActive('/' + translation.lang + '/contact')}
					onclick={closeDrawer}>{translation.contact}</a
				>
			</li>
		</ul>
		<hr />
		<ul>
			<li>
				<a href="https://twitter.com/FuwakamiMana" onclick={closeDrawer}>{translation.twitter}</a>
			</li>
			<li>
				<a href="https://www.youtube.com/@FuwakamiMana" onclick={closeDrawer}
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
				<a href="https://discord.gg/FDymkDsaxk" onclick={closeDrawer}>{translation.discord}</a>
			</li>
		</ul>
		<hr />
		<ul>
			{#if !$page.data.user}
				<li>
					<a
						href="/{translation.lang}/login"
						class={'/' + classesActive('/login')}
						onclick={closeDrawer}>{translation.login}</a
					>
				</li>
				<li>
					<a
						href="/{translation.lang}/register"
						class={'/' + classesActive('/register')}
						onclick={closeDrawer}>{translation.register}</a
					>
				</li>
			{/if}
			{#if $page.data.user}
				{#if $page.data.user.role === 'admin'}
					<li>
						<a href="/admin" class={'/' + classesActive('/admin')} onclick={closeDrawer}
							>{translation.admin}</a
						>
					</li>
				{/if}
				<form action="/logout" method="POST" use:enhance>
					<button class="w-full" type="submit" onclick={closeDrawer}>{translation.logout}</button>
				</form>
			{/if}
			{#if translation.lang === 'ja'}
				<li>
					<a href="/en{langPageSwitch}" onclick={closeDrawer}>English</a>
				</li>
			{:else}
				<li>
					<a href="/ja{langPageSwitch}" onclick={closeDrawer}>日本語</a>
				</li>
			{/if}

			<!-- <li><LightSwitch onclick={closeDrawer} /></li> -->
		</ul>
	</nav>
{/key}
