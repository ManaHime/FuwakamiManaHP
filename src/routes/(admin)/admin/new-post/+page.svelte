<script lang="ts">
	import { enhance } from '$app/forms';
	import Tiptap from '$lib/components/Tiptap.svelte';
	let textContent: string;
</script>

<div class="flex flex-col max-w-md m-auto h-1/2">
	<h1>Post new post</h1>
	<!-- 
				<button
					class="chip variant-soft-surface"
					on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
					class:active={editor.isActive('heading', { level: 2 })}
				>
					H2
				</button>
				<button
					class="chip variant-soft-surface"
					on:click={() => editor.chain().focus().setParagraph().run()}
					class:active={editor.isActive('paragraph')}
				>
					P
				</button>
				<button on:click={setLink} class={editor.isActive('link') ? 'is-active' : ''}>
					Link
				</button>
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
		
	</form> -->
	<form class="flex flex-col" method="POST" use:enhance>
		<input class="input" name="postTitle" type="text" />
		<Tiptap bind:textContent />
		<button type="submit" name="postBody" class="btn variant-soft-primary" value={textContent}
			>Submit</button
		>
	</form>
</div>
