import { Request, Response } from "express";
import config from "../../config.js";
import db from "../db.js";
import { fileURLToPath } from 'url';
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// Models
import Url from "../models/Url.js";
import File from "../models/File.js";
import Shortened from "../models/Shortened.js";
import path from "path";
import { log } from "console";

const AppDataSource = db;

// TypeORM repositries
const FileRepository = AppDataSource.getRepository(File);
const ShortenedRepository = AppDataSource.getRepository(Shortened);
const URLRepository = AppDataSource.getRepository(Url);

const get = async (req: Request | any, res: Response) => {
	const slug = req.params.sURL;
	
	if (!slug)
		res.status(400).end("the url you provided is empty or invalid\n");
	
	const urlOrFile = await ShortenedRepository.findOneBy({
		slug: slug,
	})

	if (!urlOrFile)
		return res.status(404).end("the url you provided is non existent\n");

	urlOrFile.visitors++;
	await ShortenedRepository.save(urlOrFile);

	switch (urlOrFile.type) {
		case "url":
			const url = await URLRepository.findOneBy({
				shortenedURL: slug
			})

			if (!url)
				return res.status(500).end("server error. url not found\n");

			return res.redirect(url.destination);
		case "file":
			const file = await FileRepository.findOneBy({
				filename: slug,
			})
			
			if (!file)
				return res.status(500).end("server error. file not found\n");
			
			return res.sendFile(`${process.cwd()}/${file.path}`);
		default:
			break;
	}

	res.end("");
};

export default {
	get,
};
