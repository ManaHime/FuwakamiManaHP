<script lang="ts">
    import { page } from '$app/stores';
    import { Table, tableMapperValues, tableSourceValues  } from '@skeletonlabs/skeleton';

    import type { PageData } from './$types.js';
    import type { TableSource } from '@skeletonlabs/skeleton';

    export let data: PageData

    $: ({ userTable } = data)
    $: console.log(userTable)

</script>

{#if $page.data.user.role === 'admin'}
    <div class="max-w-screen-xl m-auto">
        <Table source={userTable} />
    </div>
{/if}