<script lang="ts">
	import { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core';
	import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common';
	import * as zxcvbnEnPackage from '@zxcvbn-ts/language-en';

	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	export let form: ActionData;
	let username = '';
	let email = '';
	let password = '';
	let confirmPassword = '';
	let formDisabled = true;

	$: if (
		username !== '' &&
		email !== '' &&
		password !== '' &&
		password === confirmPassword &&
		(strengthDescription === 'Good' || strengthDescription === 'OK')
	) {
		formDisabled = false;
	} else {
		formDisabled = true;
	}

	const { translations } = zxcvbnEnPackage;
	const { adjacencyGraphs: graphs, dictionary: commonDictionary } = zxcvbnCommonPackage;
	const { dictionary: englishDictionary } = zxcvbnEnPackage;

	const options = {
		translations,
		graphs,
		dictionary: { ...commonDictionary, ...englishDictionary }
	};
	zxcvbnOptions.setOptions(options);

	$: ({
		score,
	} = zxcvbn(password));

	let strengthDescription = 'Low';
	$: switch (score) {
		case 3:
			strengthDescription = 'OK';
			break;
		case 4:
			strengthDescription = 'Good';
			break;
		case 0:
		case 1:
		case 2:
		default:
			strengthDescription = 'Low';
	}
</script>

<div class="flex flex-wrap h-full place-content-center 2xl:mr-52">
	<div class="flex flex-row items-center h-full max-w-sm">
		<div class="flex flex-col justify-around px-8 pb-8 card gap">
			<h1 class="p-8 text-center uppercase h1">登録</h1>
			<form class="flex flex-col gap-4" method="POST" use:enhance>
				<div class="space-y-4 border border-surface-500 p-7 rounded-container-token">
					<input
						class="text-center rounded-md input"
						name="username"
						placeholder="ユーザーネーム"
						type="text"
						bind:value={username}
						required
					/>
					<input
						class="text-center rounded-md input"
						name="email"
						placeholder="email@example.com"
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
						placeholder="パスワード"
						type="password"
						bind:value={password}
						required
					/>
					<input
						class="text-center rounded-md input"
						name="confirmPassword"
						placeholder="もう一回パスワード"
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
					/>
				</div>
				<button
					class="w-full mt-2 rounded-md btn variant-filled-primary"
					id="registerBtn"
					type="submit"
					disabled={formDisabled}>Register</button
				>
			</form>
		</div>
	</div>
</div>
