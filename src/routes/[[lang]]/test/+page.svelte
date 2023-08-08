<script>
    import { onMount } from 'svelte';
    export let data;
    let links = [];
    let htmlCont
    onMount(async () => {
        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data.parsedHtml, 'text/html');
            htmlCont = doc.querySelector("#character > div.character__content.selected")
            console.dir(htmlCont?.innerHTML)
        }catch (error) {
            console.error('Error fetching and parsing HTML:', error);
        }
    });
</script>
    
{#if htmlCont}
<div class="prose">
    {@html htmlCont.innerHTML}
</div>
    
{/if}