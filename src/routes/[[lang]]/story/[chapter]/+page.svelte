<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	function getChapterLabel(num: number): string {
		if (num === 0) {
			return data.lang === 'ja' ? 'プロローグ' : 'Prologue';
		}
		return data.lang === 'ja' ? `第${num}話` : `Chapter ${num}`;
	}
</script>

<svelte:head>
	<title>
		{data.lang === 'ja' ? data.title : data.titleEn} - {data.chapter.title}
	</title>
</svelte:head>

<div class="max-w-4xl mx-auto p-8">
	<h1 class="h1 mb-8 mt-8 pl-8">{data.lang === 'ja' ? data.title : data.titleEn}</h1>
	<h2 class="h2 mt-8 mb-4 pl-8">{data.chapter.title}</h2>

	<div class="flex justify-between items-center my-8 py-4 border-t border-b border-surface-500">
		{#if data.prevChapter}
			<a href={data.prevChapter.url} class="btn variant-filled-primary">
				← {getChapterLabel(data.prevChapter.number)}
			</a>
		{:else}
			<span class="btn variant-soft opacity-50 cursor-not-allowed">
				← {data.lang === 'ja' ? '前の章' : 'Previous'}
			</span>
		{/if}

		<a href={data.indexUrl} class="btn variant-soft">
			{data.lang === 'ja' ? '目次' : 'Index'}
		</a>

		{#if data.nextChapter}
			<a href={data.nextChapter.url} class="btn variant-filled-primary">
				{getChapterLabel(data.nextChapter.number)} →
			</a>
		{:else}
			<span class="btn variant-soft opacity-50 cursor-not-allowed">
				{data.lang === 'ja' ? '次の章' : 'Next'} →
			</span>
		{/if}
	</div>

	<div class="prose prose-lg max-w-none">
		{#each data.chapter.content.split('\n\n') as paragraph, i (i)}
			{#if paragraph.trim()}
				<p class="pl-8 {i > 0 ? 'mt-6' : ''}">{@html paragraph.trim().replace(/\n/g, '<br>')}</p>
			{/if}
		{/each}
	</div>

	<div class="flex justify-between items-center my-8 py-4 border-t border-b border-surface-500">
		{#if data.prevChapter}
			<a href={data.prevChapter.url} class="btn variant-filled-primary">
				← {getChapterLabel(data.prevChapter.number)}
			</a>
		{:else}
			<span class="btn variant-soft opacity-50 cursor-not-allowed">
				← {data.lang === 'ja' ? '前の章' : 'Previous'}
			</span>
		{/if}

		<a href={data.indexUrl} class="btn variant-soft">
			{data.lang === 'ja' ? '目次' : 'Index'}
		</a>

		{#if data.nextChapter}
			<a href={data.nextChapter.url} class="btn variant-filled-primary">
				{getChapterLabel(data.nextChapter.number)} →
			</a>
		{:else}
			<span class="btn variant-soft opacity-50 cursor-not-allowed">
				{data.lang === 'ja' ? '次の章' : 'Next'} →
			</span>
		{/if}
	</div>
</div>

