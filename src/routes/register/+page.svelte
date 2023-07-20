<script lang="ts">
    import type { ActionData } from './$types';
    import { enhance } from '$app/forms';
    export let form: ActionData
    let username: string = ""
    let email: string = ""
    let password: string = ""
    let confirmPassword: string = ""
    let formDisabled = true


    $: if( username !== "" &&
        email !== "" &&
        password !== "" &&
        password === confirmPassword){
            formDisabled = false
            console.log(formDisabled)
    } else {
        formDisabled = true
        console.log(formDisabled)
    }

</script>

<div class="flex flex-wrap h-full place-content-center">
    <div class="flex flex-col px-16 py-10 card">
        <h2 class="pb-5 text-center uppercase h2">登録</h2>
        <form class="flex flex-col gap-3" method="post" use:enhance>
            <input class="text-center input" name="username" placeholder="ユーザーネーム" type="text" bind:value={username} required>
            <input class="text-center input" name="email" placeholder="email@example.com" type="email" bind:value={email} required>
            {#if form?.invalid}
                <p class="error">Username is taken.</p>
            {/if}
            <input class="text-center input" name="password" placeholder="パスワード" type="password" bind:value={password} required>
            <input class="text-center input" name="confirmPassword" placeholder="もう一回パスワード" type="password" bind:value={confirmPassword} required>
            <button class="w-full btn variant-filled-primary" id="registerBtn" type="submit" disabled={formDisabled}>Register</button>
        </form>
    </div>
</div>