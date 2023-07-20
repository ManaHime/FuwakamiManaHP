<script lang="ts">
    import { page } from "$app/stores";
    import { TabGroup, Tab, TabAnchor } from '@skeletonlabs/skeleton';

</script>

{#if $page.data.user.role === 'admin'}
    <div class="flex flex-col card max-w-screen-xl m-auto p-5">
        <div class="card-header">
            <h1 class="h1">Welcome {$page.data.user.name}!</h1>
            <h2 class="h2">Admin</h2>    
        </div>
    </div>
{/if}