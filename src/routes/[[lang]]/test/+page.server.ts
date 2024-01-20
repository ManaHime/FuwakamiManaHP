export const load = async () => {
	const res = await fetch(
		'https://cdn.discordapp.com/attachments/933165135676178512/1143444163472408576/2023-08-21_19-23-53-883_Neneko_Melonpan.png'
	);
	const buffer = await res.arrayBuffer();
	const base64 = btoa(
		new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
	);
	console.log(base64);
	return { img: 'img' };
};
