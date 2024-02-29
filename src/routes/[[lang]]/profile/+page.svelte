<script lang="ts">
export let data;
$: user = data.user;
</script>

<div class="flex flex-col gap-5 py-10 place-items-center 2xl:mr-52">
	<div class="flex w-full max-w-screen-xl p-5 place-content-between card">
		<div class="flex flex-col max-w-screen-md">
			<h1 class="h1 pb-10">Profile</h1>
			<div class="flex h-full place-items-center">
            {#if user}
            {user.name}
            {user.avatar}
            {/if}
			</div>
		</div>
	</div>
</div>

