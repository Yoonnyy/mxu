import { Request, Response } from "express";
import db from "../db.js";
import config from "../../config.js";
import generateRndstr from "../utils/generateRndstr.js";

// Models
import Url from "../models/Url.js";
import File from "../models/File.js";
import Shortened from "../models/Shortened.js";

const AppDataSource = db;

// TypeORM repositries
const FileRepository = AppDataSource.getRepository(File);
const ShortenedRepository = AppDataSource.getRepository(Shortened);
const URLRepository = AppDataSource.getRepository(Url);

const post = async (req: Request | any, res: Response) => {
	const url: string = req.body.url;
	const file = req.file;
	
	if (!url && !file) {
		return res.end("you must either provide a url or a file\n");
	}

	if (url && file) {
		return res.status(400).end(
			"You must either provide a url or a file, but not both\n"
		);
	}

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

		// create shortened URL
		let shortenedURL = await generateRndstr();

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
// TODO: HTTP status codes

