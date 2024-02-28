<script lang="ts">
	export let data;
	$: translation = data.translation;
</script>

<div class="flex flex-col gap-5 py-10 place-items-center 2xl:mr-52">
	<div class="flex w-full max-w-screen-xl p-5 place-content-between card">
		<div class="flex flex-col max-w-screen-md">
			<h1 class="h1 text-clip">{translation.title}</h1>
			<h2 class="h2">{translation.subTitle}</h2>
			<div class="flex h-full place-items-center">
				<dl class="list-dl">
					<div>
						<span class="p-4 badge-icon variant-soft-secondary">📄</span>
						<span class="flex-auto">
							<dt class="font-bold">{translation.list[1].title}</dt>
							<dd class="text-sm opacity-50">{translation.list[1].description}</dd>
						</span>
					</div>
					<div>
						<span class="p-4 badge-icon variant-soft-secondary">📄</span>
						<span class="flex-auto">
							<dt class="font-bold">{translation.list[2].title}</dt>
							<dd class="text-sm opacity-50">{translation.list[2].description}</dd>
						</span>
					</div>
					<div>
						<span class="p-4 badge-icon variant-soft-secondary">📄</span>
						<span class="flex-auto">
							<dt class="font-bold">{translation.list[3].title}</dt>
							<dd class="text-sm opacity-50">{translation.list[3].description}</dd>
						</span>
					</div>
				</dl>
			</div>
		</div>
		<div class="max-w-[40%] hidden lg:flex place-items-center">
			<img
				class="image drop-shadow shadow-black"
				src="/images/fuwakami_mana.png"
				alt="Fuwakami Mana"
			/>
		</div>
	</div>
</div>
