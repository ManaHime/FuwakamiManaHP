<script>
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Link from '@tiptap/extension-link';

	let element;
	let editor;
	export let content;
	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [StarterKit, Link],
			editable: false,
			editorProps: {
				attributes: {
					class: 'w-full'
				}
			},
			content,
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
			}
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

<div bind:this={element} />
