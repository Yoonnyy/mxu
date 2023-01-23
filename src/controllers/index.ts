import { Request, Response } from "express";
import connect from "../db.js";
import config from "../../config.js";
import rndstr from "../utils/rndstr.js";

// Models
import Url from "../models/Url.js";
import File from "../models/File.js";
import Shortened from "../models/Shortened.js";

const AppDataSource = connect();

const post = async (req: Request | any, res: Response) => {
	const url: string = req.body.url;
	const file = req.file;

	if (!url && !file) {
		return res.end("you must either provide a url or a file\n");
	}

	if (url && file) {
		res.status(400).end(
			"You must either provide a url or a file, but not both\n"
		);
	}

	const ShortenedRepository = AppDataSource.getRepository(Shortened);

	// URL shortening
	if (url) {
		//check if url shortening is allowed
		if (!config.URL_SHORTENING_ACTIVE) {
			return res.end("url shortening is disabled");
		}

		// check if the URL starts with "https://" and is shorter than MAX_URL_LENGTH
		if (!url.startsWith("https://") || url.length > config.MAX_URL_LENGTH) {
			return res.end("invalid URL\n");
		}

		// TODO: check blacklisted urls

		const URLRepository = AppDataSource.getRepository(Url);

		// create shortened URL
		let shortenedURL = rndstr(config.SHORTENED_URL_LENGTH);

		// check for duplicate shortenedURLs
		for (;;) {
			const check = await URLRepository.findOneBy({
				shortenedURL,
			});
			// break if check is null else create a new shortenedURL
			if (!check) {
				break;
			}

			shortenedURL = rndstr(6);
		}

		// URL entity to save
		const newUrl = URLRepository.create({
			URL: url,
			shortenedURL,
			expires: 1, // TODO: calculate expire time
		});
		const newShort = ShortenedRepository.create({
			type: "url",
			URL: shortenedURL,
		});

		await URLRepository.save(newUrl);
		await ShortenedRepository.save(newShort);
		return res.end(`${newUrl.shortenedURL}\n`);
	}

	if (file) {
		if (!config.FILE_UPLOAD_ACTIVE) {
			return res.end("file upload is disabled");
		}

		const FileRepository = AppDataSource.getRepository(File);

		// TODO:handle duplicate error
		// check for duplicate shortenedURLs
		for (;;) {
			const check = await FileRepository.findOneBy({
				filename: file.filename,
			});
			// break if check is null else create a new shortened filename
			if (!check) {
				break;
			}
		}

		// File entity to save
		const newFile = FileRepository.create({
			originalFilename: file.originalname,
			filename: file.filename,
			expires: 1, // TODO: calculate expire time
			size: file.size,
			path: file.path,
		});
		const newShort = ShortenedRepository.create({
			type: "file",
			URL: file.filename,
		});

		await ShortenedRepository.save(newShort);
		await FileRepository.save(newFile);
		return res.end(`${newFile.filename}\n`);
	}

	res.status(200).end("\n");
};

export default {
	post,
};

// TODO: Error handling
// TODO: Custom expire
// TODO: File deletion with token
// TODO: Fix where db connect fuction
// TODO: HTTP status codes
