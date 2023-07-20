<script lang="ts">
    import type { ActionData } from './$types';
    import { enhance } from '$app/forms';
    export let form: ActionData

    // Rich Text Editor
    import { onMount, onDestroy } from 'svelte'
    import { Editor } from '@tiptap/core'
    import StarterKit from '@tiptap/starter-kit'

    let element
    let editor
    let postTextBody: string
    $: postTextBody = editor?.getHTML()
    onMount(() => {
        editor = new Editor({
        element: element,
        extensions: [
            StarterKit,
        ],
        editorProps: {
            attributes: {
                class: 'textarea h-[300px] overflow-y-scroll overflow-clip posts prose dark:prose-invert'
            },
        },
        content: '',
        onTransaction: () => {
            // force re-render so `editor.isActive` works as expected
            editor = editor
        },
        })
    })
    onDestroy(() => {
        if (editor) {
        editor.destroy()
        }
    })

</script>

<div class="flex flex-col max-w-md m-auto h-1/2">
    <h1>Post new post</h1>
    <form class="flex flex-col" method="POST" use:enhance>
        <input class="input" name="postTitle" type="text">
        
        {#if editor}
            <div class="flex place-content-evenly w-full">
                <button
                    class="chip variant-soft-surface"
                    on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    class:active={editor.isActive('heading', { level: 2 })}
                >
                    H2
                </button>
                <button
                    class="chip variant-soft-surface"
                    on:click={() => editor.chain().focus().setParagraph().run()} class:active={editor.isActive('paragraph')}
                >
                    P
                </button>
            </div>
        {/if}

        <div bind:this={element} />



        <button type="submit" name="postBody" class="btn variant-soft-primary" value={postTextBody} >Submit</button>
    </form>
</div>