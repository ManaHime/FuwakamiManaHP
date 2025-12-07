<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Link from '@tiptap/extension-link';

	let element: HTMLElement | null = null; // Plain HTMLElement
	let editor: Editor | null = null; // Instance of Editor
	let { content }: { content: string } = $props();

	onMount(() => {
		if (element) {
			// Ensure element is available
			// StarterKit already includes Link, so we configure it to exclude Link and add it separately
			editor = new Editor({
				element, // DOM element reference
				extensions: [
					StarterKit.configure({
						link: false // Exclude Link from StarterKit to avoid duplicate
					}),
					Link
				],
				editable: false,
				editorProps: {
					attributes: {
						class: 'w-full'
					}
				},
				content,
				onTransaction: () => {
					// Your transaction handling logic
				}
			});
		}
	});

	onDestroy(() => {
		editor?.destroy(); // Safely call destroy if editor is initialized
	});
</script>

<div bind:this={element}></div>
