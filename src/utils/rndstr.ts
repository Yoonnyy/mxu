import crypto from "crypto"

// higher the length is lower the chance of duplicate strings
function rndstr(length: number): string {
	return crypto.randomBytes(length).toString("hex");
}

export default rndstr;
