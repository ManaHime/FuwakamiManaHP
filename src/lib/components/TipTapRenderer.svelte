<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Link from '@tiptap/extension-link';

	let element: HTMLElement | null = null; // Plain HTMLElement
	let editor: Editor | null = null; // Instance of Editor
	export let content: string;

	onMount(() => {
		if (element) {
			// Ensure element is available
			editor = new Editor({
				element, // DOM element reference
				extensions: [StarterKit, Link],
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

<div bind:this={element} />
