<script lang="ts">
	type Stream = {
		time: string;
		title: string;
	};

	type Day = {
		date: Date;
		streams: Stream[];
	};

	let days: Day[] = [];

	// Function to find the next Monday
	function getNextMonday(): Date {
		const today = new Date();
		const nextMonday = new Date();
		nextMonday.setDate(today.getDate() + ((1 + 7 - today.getDay()) % 7 || 7));
		return nextMonday;
	}

	// Initialize the days array with streams
	function initializeDays(): void {
		let startDay = getNextMonday();
		for (let i = 0; i < 7; i++) {
			days.push({
				date: new Date(startDay),
				streams: [{ time: '12:00', title: '' }]
			});
			startDay.setDate(startDay.getDate() + 1);
		}
	}

	initializeDays();

	function addStream(dayIndex: number): void {
		days[dayIndex].streams.push({ time: '12:00', title: '' });
		days[dayIndex].streams = days[dayIndex].streams;
	}

	function removeStream(dayIndex: number, streamIndex: number): void {
		if (days[dayIndex].streams.length > 1) {
			days[dayIndex].streams.splice(streamIndex, 1);
			days[dayIndex].streams = days[dayIndex].streams;
		}
	}

	function generateId(dayIndex: number, streamIndex: number, type: string): string {
		return `day-${dayIndex}-stream-${streamIndex}-${type}`;
	}

	// Reactive statement to update the output
	$: output = days
		.flatMap((day) =>
			day.streams.length > 0 && day.streams.some((stream) => stream.title)
				? day.streams.map((stream) => {
						const dateTime = new Date(day.date);
						dateTime.setHours(Number(stream.time.split(':')[0]));
						dateTime.setMinutes(Number(stream.time.split(':')[1]));
						const unixTime = Math.floor(dateTime.getTime() / 1000);
						return stream.title
							? `<t:${unixTime}:F>: ${stream.title}`
							: `<t:${unixTime}:F>: No Stream`;
				  })
				: [`<t:${Math.floor(day.date.getTime() / 1000)}:F>: No Stream`]
		)
		.join('\n');
</script>

<div class="flex flex-col-reverse gap-5 place-items-center 2xl:mr-52">
	<div class="w-full max-w-screen-md p-5 card">
		<div class="">
			<form>
				{#each days as day, dayIndex}
					<div class="mb-4">
						<div class="font-semibold mb-2">{day.date.toDateString()}</div>
						<button
							type="button"
							on:click={() => addStream(dayIndex)}
							class="btn-sm mt-2 rounded-md variant-filled-primary">Add Stream</button
						>
						{#each day.streams as stream, streamIndex}
							<div class="flex">
								<div>
									<label for={generateId(dayIndex, streamIndex, 'time')}>Time:</label>
									<input
										type="time"
										id={generateId(dayIndex, streamIndex, 'time')}
										bind:value={stream.time}
									/>
								</div>
								<div>
									<label for={generateId(dayIndex, streamIndex, 'title')}>Stream Title:</label>
									<input
										type="text"
										id={generateId(dayIndex, streamIndex, 'title')}
										placeholder="Stream"
										bind:value={stream.title}
									/>
								</div>
								{#if day.streams.length > 1}
									<button
										type="button"
										on:click={() => removeStream(dayIndex, streamIndex)}
										class="btn-sm mt-2 rounded-md variant-filled-error"
									>
										Remove Stream
									</button>
								{/if}
							</div>
						{/each}
					</div>
				{/each}
			</form>
			<textarea readonly rows="10" class="w-full">{output}</textarea>
		</div>
	</div>
</div>
