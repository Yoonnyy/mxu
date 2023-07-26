// higher the length is lower the chance of duplicate strings
function rndstr(length: number): string {
	let result = "";
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (let i = 0; i < length; i++) {
		result += characters[Math.floor(Math.random() * characters.length)];
	}
	return result;
}

export default rndstr;
