<script lang="ts">
    export let data
    let streamData = data.streamData
    console.log(streamData)
</script>
<h1 class="h1 text-center 2xl:mr-52 py-10">Live Stream / 生放送</h1>
<div class="flex gap-5 place-content-center 2xl:mr-52">
    
	{#each streamData as data}
        {#if data.snippet.title !== "Mana Ch. ふわかみ・まな Live Stream"}
            <div class="w-full p-5 prose xl:prose-2xl card">
                <div class="flex flex-col items-center content-center">
                    <h2 class="h2"><a href="https://youtube.com/live/{data.id}">{data.snippet.title}</a></h2>
                    <div>
                        <img src="{data.snippet.thumbnails.medium.url}" alt="youtube thumbnail">
                    </div>
                </div>
            </div>
        {/if}
    {/each}
</div>