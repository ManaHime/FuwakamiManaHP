<script lang="ts">
	let elemCarousel: HTMLDivElement;
	const imgIds = ['odder-otter', 'odder-otter-cafe-1', 'odder-otter-cafe-2'];
	let scrollRightInterval: ReturnType<typeof setInterval>;

	let scheduleData: any = ""
</script>

<div class="flex flex-col-reverse gap-5 place-items-center 2xl:mr-52">
	<div class="w-full max-w-screen-lg p-5 prose xl:prose-2xl card">
		<div class="flex flex-col place-content-between">
			<form>
				Mon <input type="time" name="" id="" bind:value={scheduleData.mon.time}> <input type="text" name="" id=""><br>
				Tue <input type="time" name="" id=""> <input type="text" name="" id=""><br>
				Wed <input type="time" name="" id=""> <input type="text" name="" id=""><br>
				Thu <input type="time" name="" id=""> <input type="text" name="" id=""><br>
				Fri <input type="time" name="" id=""> <input type="text" name="" id=""><br>
				Sat <input type="time" name="" id=""> <input type="text" name="" id=""><br>
				Sun <input type="time" name="" id=""> <input type="text" name="" id="">
			</form>
			{#if scheduleData.mon.time}
				{scheduleData.mon.time}
			{/if}
				

		</div>
	</div>
</div>
