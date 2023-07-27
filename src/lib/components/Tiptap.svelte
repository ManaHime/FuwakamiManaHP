<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Link from '@tiptap/extension-link';

	let element: any;
	let editor: any;
	export let textContent;

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [StarterKit, Link],
			editorProps: {
				attributes: {
					class: 'textarea h-[300px] overflow-y-scroll overflow-clip posts prose dark:prose-invert'
				}
			},
			content: '',
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
				textContent = editor.getHTML();
			}
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});

	const setLink = () => {
		const previousUrl = editor.getAttributes('link').href;
		const url = window.prompt('URL', previousUrl);

		// cancelled
		if (url === null) {
			return;
		}

		// empty
		if (url === '') {
			editor.chain().focus().extendMarkRange('link').unsetLink().run();
			return;
		}

		// update link
		editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
	};
</script>

{#if editor}
	<div class="flex gap-1">
		<button
			on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
			class:active={editor.isActive('heading', { level: 1 })}
		>
			H1
		</button>
		<button
			on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
			class:active={editor.isActive('heading', { level: 2 })}
		>
			H2
		</button>
		<button
			on:click={() => editor.chain().focus().toggleBold().run()}
			class:active={editor.isActive('bold')}
		>
			b
		</button>
		<button
			on:click={() => editor.chain().focus().toggleItalic().run()}
			class:active={editor.isActive('italic')}
		>
			italic
		</button>
		<button
			on:click={() => editor.chain().focus().toggleStrike().run()}
			class:active={editor.isActive('strike')}
			class="line-through"
		>
			a
		</button>
		<button
			on:click={() => editor.chain().focus().toggleCode().run()}
			class:active={editor.isActive('<>')}
		>
			code
		</button>
		<button
			on:click={() => editor.chain().focus().toggleBulletList().run()}
			class:active={editor.isActive('bulletList')}
		>
			bullet list
		</button>
		<button
			on:click={() => editor.chain().focus().toggleOrderedList().run()}
			class:active={editor.isActive('orderedList')}
		>
			ordered list
		</button>
		<button
			on:click={() => editor.chain().focus().toggleCodeBlock().run()}
			class:active={editor.isActive('codeBlock')}
		>
			code block
		</button>
		<button
			on:click={() => editor.chain().focus().toggleBlockquote().run()}
			class:active={editor.isActive('blockquote')}
		>
			blockquote
		</button>
		<button on:click={() => editor.chain().focus().setHorizontalRule().run()}>
			horizontal rule
		</button>
		<button on:click={() => editor.chain().focus().setHardBreak().run()}> hard break </button>
		<button on:click={setLink} class={editor.isActive('link') ? 'is-active' : ''}> Link </button>
		<button
			on:click={() => editor.chain().focus().unsetLink().run()}
			disabled={!editor.isActive('link')}
		>
			Unlink
		</button>
		<button
			on:click={() => editor.chain().focus().undo().run()}
			disabled={!editor.can().chain().focus().undo().run()}
		>
			undo
		</button>
		<button
			on:click={() => editor.chain().focus().redo().run()}
			disabled={!editor.can().chain().focus().redo().run()}
		>
			redo
		</button>
	</div>
{/if}

<div bind:this={element} />

<style>
	button.active {
		background: black;
		color: white;
	}
</style>
