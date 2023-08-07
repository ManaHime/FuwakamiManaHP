<script lang="ts">
	let elemCarousel: HTMLDivElement;
	const imgIds = ['odder-otter', 'odder-otter-cafe-1', 'odder-otter-cafe-2'];

	function carouselLeft(): void {
		if (elemCarousel) {
			const x =
				elemCarousel.scrollLeft === 0
					? elemCarousel.clientWidth * elemCarousel.childElementCount // loop
					: elemCarousel.scrollLeft - elemCarousel.clientWidth; // step left
			elemCarousel.scroll(x, 0);
		}
	}

	function carouselRight(): void {
		if (elemCarousel) {
			const x =
				elemCarousel.scrollLeft === elemCarousel.scrollWidth - elemCarousel.clientWidth
					? 0 // loop
					: elemCarousel.scrollLeft + elemCarousel.clientWidth; // step right
			elemCarousel.scroll(x, 0);
		}
	}

	setInterval(carouselRight, 5000);
</script>

<div class="flex flex-col-reverse gap-5 place-items-center 2xl:mr-52">
	<div class="w-full max-w-screen-xl p-5 prose xl:prose-2xl card">
		<div class="flex flex-col place-content-between">
			<img src="/images/odder-otter-community.png" alt="Odder Otter Banner" />
			<div class="p-4 grid grid-cols-[auto_1fr_auto] gap-4 items-center">
				<!-- Button: Left -->
				<button type="button" class="btn-icon variant-filled" on:click={carouselLeft}>
					<i class="fa-solid fa-arrow-left" />
				</button>
				<!-- Full Images -->
				<div
					bind:this={elemCarousel}
					class="flex overflow-x-auto snap-x snap-mandatory scroll-smooth"
				>
					{#each imgIds as imgId}
						<img
							class="snap-center w-[1024px] rounded-container-token"
							src="/images/{imgId}.jpg"
							alt={imgId}
							loading="lazy"
						/>
					{/each}
				</div>
				<!-- Button: Right -->
				<button type="button" class="btn-icon variant-filled" on:click={carouselRight}>
					<i class="fa-solid fa-arrow-right" />
				</button>
			</div>
			<p>
				Odder Otter is a language and culture exchange community in Final Fantasy XIV. <br />
				Odder OtterとはファイナルファンタジーXIVにある言語・文化交流コニュニティーです。
			</p>
			<p>
				This community was build to help bridge English and Japanese speaking communities, and to
				help us learn more about each other! <br />
				このコニュニティーは英語と日本語の架け橋となり、お互いをより助け合うために作られました！
			</p>
			<p><a href="https://discord.gg/FDymkDsaxk">Odder Otter Discord Server</a></p>
		</div>
	</div>
</div>
