<script lang="ts">
    import type { ActionData } from './$types';
    import { enhance } from '$app/forms';
    
    export let form: ActionData   
</script>
<div class="flex flex-wrap h-full place-content-center 2xl:mr-52">
    <div class="flex flex-row items-center h-full max-w-sm">
        <div class="flex flex-col justify-around px-8 pb-8 card gap">
            <h1 class="p-8 text-center uppercase h1">ログイン</h1>
            <form class="flex flex-col gap-4" method="POST" use:enhance>
                <div class="p-4 space-y-4 border border-surface-500 rounded-container-token">
                    <input name="email" type="email" placeholder="email@example.com" class="rounded-md input">
                    <input name="password" type="password" placeholder="パスワード" class="rounded-md input">
                    {#if form?.invalid}
                        <p class="error">Username and password is required.</p>
                    {/if}
                    {#if form?.credentials}
                        <p class="error">You have entered the wrong credentials.</p>
                    {/if}
                </div>
                <button type="submit" class="rounded-md btn variant-soft-primary">ログイン</button>
            </form>
        </div>
    </div>
</div>