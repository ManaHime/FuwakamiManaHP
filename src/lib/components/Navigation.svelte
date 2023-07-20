<script lang="ts">
    import { page } from '$app/stores'
    import { enhance } from '$app/forms';
    import { LightSwitch, drawerStore } from '@skeletonlabs/skeleton';

    function closeDrawer(){
        drawerStore.close()
    }
</script>

<nav class="p-4 list-nav">
    <ul>
        <li><a href="/" on:click={closeDrawer}>ホーム</a></li>
        <li><a href="/blog" on:click={closeDrawer}>ブログ</a></li>
        <li><a href="/wiki" on:click={closeDrawer}>Wiki</a></li>
        <li><a href="/portfolio" on:click={closeDrawer}>ポートフォリオ</a></li>
        <li><a href="https://twitter.com/FuwakamiMana" on:click={closeDrawer}>ツイッター</a></li>
        <li><a href="https://www.youtube.com/@FuwakamiMana" on:click={closeDrawer}>YouTube</a></li>
        <li><a href="https://discord.gg/FDymkDsaxk" on:click={closeDrawer}>Discord</a></li>
        {#if $page.data?.user?.role === 'admin'}
			<li><a href="/admin" on:click={closeDrawer}>Admin</a></li>
			{/if}
        <li><a href="/contact" on:click={closeDrawer}>Contact</a></li>
        {#if !$page.data.user}
        <li><a href="/login" on:click={closeDrawer}>Login</a></li>
        <li><a href="/register" on:click={closeDrawer}>Register</a></li>
        {/if}
        {#if $page.data.user}
            <li><form action="/logout" method="POST"  use:enhance>
                    <button class="w-full" type="submit" on:click={closeDrawer}>Logout</button>
                </form>
            </li>
        {/if}
        <li><LightSwitch on:click={closeDrawer}  /></li>
    </ul>
</nav>