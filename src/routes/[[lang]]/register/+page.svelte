<script lang="ts">
	import { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core';
	import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common';
	import * as zxcvbnEnPackage from '@zxcvbn-ts/language-en';

	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	let { form, data }: { form: ActionData; data: any } = $props();
	let translation = $derived(data.translation);

	let username = $state('');
	let email = $state('');
	let password = $state('');
	let confirmPassword = $state('');

	const { translations } = zxcvbnEnPackage;
	const { adjacencyGraphs: graphs, dictionary: commonDictionary } = zxcvbnCommonPackage;
	const { dictionary: englishDictionary } = zxcvbnEnPackage;

	const options = {
		translations,
		graphs,
		dictionary: { ...commonDictionary, ...englishDictionary }
	};
	zxcvbnOptions.setOptions(options);

	let score = $derived.by(() => zxcvbn(password).score);

	let strengthDescription = $derived.by(() => {
		switch (score) {
			case 3:
				return 'OK';
			case 4:
				return 'Good';
			case 0:
			case 1:
			case 2:
			default:
				return 'Low';
		}
	});

	let formDisabled = $derived(
		username !== '' &&
			email !== '' &&
			password !== '' &&
			password === confirmPassword &&
			(strengthDescription === 'Good' || strengthDescription === 'OK')
	);
</script>

<div class="flex flex-wrap h-full place-content-center 2xl:mr-52">
	<div class="flex flex-row items-center h-full max-w-sm">
		<div class="flex flex-col justify-around px-8 pb-8 card gap">
			<h1 class="p-8 text-center uppercase h1">{translation.title}</h1>
			<form class="flex flex-col gap-4" method="POST" use:enhance>
				<div class="space-y-4 border border-surface-500 p-7 rounded-container">
					<input
						class="text-center rounded-md input"
						name="username"
						placeholder={translation.username}
						type="text"
						bind:value={username}
						required
					/>
					<input
						class="text-center rounded-md input"
						name="email"
						placeholder={translation.email}
						type="email"
						bind:value={email}
						required
					/>
					{#if form?.invalid}
						<p class="error">Username is taken.</p>
					{/if}
					<input
						class="text-center rounded-md input"
						name="password"
						placeholder={translation.password}
						type="password"
						bind:value={password}
						required
					/>
					<input
						class="text-center rounded-md input"
						name="confirmPassword"
						placeholder={translation.confirmPassword}
						type="password"
						bind:value={confirmPassword}
						required
					/>
					<label for="password-strength">Password strength: {strengthDescription}</label>
					<meter
						class="w-full"
						id="password-strength"
						value={score}
						low="1.9"
						high="2.9"
						optimum="4"
						max="4"
					></meter>
				</div>
				<button
					class="w-full mt-2 rounded-md btn preset-filled-primary"
					id="registerBtn"
					type="submit"
					disabled={formDisabled}>{translation.submit}</button
				>
			</form>
		</div>
	</div>
</div>
