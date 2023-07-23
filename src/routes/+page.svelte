<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	let visible: boolean = true;
</script>

<div class="flex flex-col-reverse gap-5 py-10 place-items-center 2xl:mr-52">
	<div class="flex w-full max-w-screen-xl p-5 place-content-between card">
		<div class="flex flex-col">
			<h1 class="h1">ウェブ開発、言語学習、映像編集の軌跡を紡ぐ</h1>
			<h2 class="h2">創造性と学びを織り交ぜたウェブの旅</h2>
			<div class="flex h-full place-items-center">
				<dl class="list-dl">
					<div>
						<span class="p-4 badge-icon variant-soft-secondary">📄</span>
						<span class="flex-auto">
							<dt class="font-bold">実践リーダーシップ</dt>
							<dd class="text-sm opacity-50">共同作業で問題解決</dd>
						</span>
					</div>
					<div>
						<span class="p-4 badge-icon variant-soft-secondary">📄</span>
						<span class="flex-auto">
							<dt class="font-bold">多言語コミュニケーター</dt>
							<dd class="text-sm opacity-50">3言語でつながる世界</dd>
						</span>
					</div>
					<div>
						<span class="p-4 badge-icon variant-soft-secondary">📄</span>
						<span class="flex-auto">
							<dt class="font-bold">技術的冒険家</dt>
							<dd class="text-sm opacity-50">最先端技術、一緒に学びましょうか？</dd>
						</span>
					</div>
				</dl>
			</div>
		</div>
		<div class="flex-1 max-w-full place-items-center">
			<img
				class="image drop-shadow shadow-black"
				src="https://cdn.discordapp.com/attachments/546519231601311761/1108732067296055366/Mana_2Dmodel_002.png"
				alt="Mana's vtuber avatar"
			/>
		</div>
	</div>
</div>
