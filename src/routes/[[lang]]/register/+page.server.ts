import { fail, redirect } from '@sveltejs/kit';

import { addUser, getUserExists } from '$lib/db/users/users';

import { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core';
import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common';
import * as zxcvbnEnPackage from '@zxcvbn-ts/language-en';

import type { Actions } from './$types';
import bcrypt from 'bcrypt';
import { RegistrationTranslation } from '$lib/translation/translation';
import { getPreferredLanguage } from '$lib/translation/language';

type Language = keyof typeof RegistrationTranslation;

export const load = async function ({ locals, params, request }) {
	if (locals.user) {
		redirect(302, '/');
	}
	const lang: Language =
		(params.lang as Language) ||
		getPreferredLanguage(request.headers.get('accept-language')) ||
		'en';
	return {
		translation: RegistrationTranslation[lang]
	};
};

const isPasswordStrenthOk = (password: string) => {
	const { translations } = zxcvbnEnPackage;
	const { adjacencyGraphs: graphs, dictionary: commonDictionary } = zxcvbnCommonPackage;
	const { dictionary: englishDictionary } = zxcvbnEnPackage;

	const options = {
		translations,
		graphs,
		dictionary: { ...commonDictionary, ...englishDictionary }
	};
	zxcvbnOptions.setOptions(options);
	const { score } = zxcvbn(password);
	if (score >= 2) return true;
};

export const actions: Actions = {
	default: async (req) => {
		const data = await req.request.formData();
		const username = data.get('username');
		const email = data.get('email');
		const rawPassword = data.get('password');
		const confirmPassword = data.get('confirmPassword');

		if (
			typeof username !== 'string' ||
			typeof email !== 'string' ||
			typeof rawPassword !== 'string' ||
			typeof confirmPassword !== 'string' ||
			!username ||
			!email ||
			!rawPassword ||
			!confirmPassword ||
			rawPassword !== confirmPassword ||
			rawPassword.length < 8
		) {
			return fail(400, { invalid: true });
		}

		if (!isPasswordStrenthOk(rawPassword)) {
			return fail(400, { invalid: true });
		}

		if (await getUserExists(email)) {
			return fail(400, { invalid: true });
		}

		const password = await bcrypt.hash(rawPassword, 10);
		await addUser(username, email, password);
		redirect(303, '/login');
	}
};
