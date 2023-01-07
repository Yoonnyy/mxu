import { Request, Response } from "express";
import Url from "../models/Url.js";
import File from "../models/File.js";
import connect from "../db.js";

const AppDataSource = connect();

const post = (req: Request | any, res: Response) => {
	const url: string = req.fields.url;
	const file = req.files.file;

	res.json({
		url,
		file,
	});
};

export default {
	post,
};
