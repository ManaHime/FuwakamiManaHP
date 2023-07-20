<script lang="ts">
    import type { ActionData } from './$types';
    import { enhance } from '$app/forms';
    
    export let form: ActionData   
</script>
<div class="flex flex-wrap h-full place-content-center">
    <div class="flex flex-row items-center h-full">
        <div class="flex flex-col px-16 py-10 card">
            <h1 class="text-xl text-center uppercase">Login</h1>
            <form class="flex flex-col gap-3" method="POST" use:enhance>
                <input name="email" type="email" placeholder="email@example.com" class="input">
                <input name="password" type="password" placeholder="password" class="input">
                {#if form?.invalid}
                    <p class="error">Username and password is required.</p>
                {/if}
                {#if form?.credentials}
                    <p class="error">You have entered the wrong credentials.</p>
                {/if}
                <button type="submit" class="btn">Login</button>
            </form>
        </div>
    </div>
</div>