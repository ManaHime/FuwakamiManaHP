<script lang="ts">
    export let data
    $: url = data.url
</script>

{#if url}
    <a href="{data.url}" class="btn variant-outline-primary">Link YouTube Account</a>
{/if}