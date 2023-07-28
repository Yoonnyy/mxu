import rndstr from "./rndstr.js"
import crypto from "crypto"
import db from "../db.js"
import Shortened from "../models/Shortened.js";
import config from "../../config.js";

const AppDataSource = db;
const ShortenedRepository = AppDataSource.getRepository(Shortened);

async function generateRndstr() : Promise<string>
{
	let random = rndstr(config.SHORTENED_URL_LENGTH);

	// TODO: better duplicate check
	// TODO: increase Rndstr length
	// check for duplicate
	for (;;) {
		const check = await ShortenedRepository.findOneBy({
			URL: random,
		});
		// break if check is null else create a new shortenedURL
		if (!check) {
			break;
		}
		random = rndstr(config.SHORTENED_URL_LENGTH);
	}

	return random;
}

export default generateRndstr;