<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';

	let { data }: { data: PageData } = $props();

	const langPrefix = $derived(data.lang ? `/${data.lang}` : '');
</script>

<svelte:head>
	<title>
		{data.lang === 'ja' ? data.title : data.titleEn} - {data.lang === 'ja' ? '目次' : 'Index'}
	</title>
</svelte:head>

<div class="max-w-4xl mx-auto p-8">
	<h1 class="h1 mb-8">{data.lang === 'ja' ? data.title : data.titleEn}</h1>
	<h2 class="h2 mt-8 mb-4">{data.lang === 'ja' ? '目次' : 'Index'}</h2>

	<ul class="list-none p-0 my-8 space-y-4">
		{#each data.chapters as chapter}
			<li
				class="p-4 border border-surface-500 rounded-container transition-colors hover:bg-surface-100-900-token"
			>
				<a href={chapter.url} class="block no-underline text-inherit">
					<span class="font-semibold text-primary-500 mr-2">
						{chapter.number === 0
							? data.lang === 'ja'
								? 'プロローグ'
								: 'Prologue'
							: data.lang === 'ja'
								? `第${chapter.number}話`
								: `Chapter ${chapter.number}`}
					</span>
					<span class="text-lg">{chapter.title}</span>
				</a>
			</li>
		{/each}
	</ul>
</div>

