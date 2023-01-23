import { Request, Response } from "express";
import config from "../../config.js";

const get = async (req: Request | any, res: Response) => {
	const sURL = req.params.sURL;

	// TODO: url redirect
	// TODO: file download
	res.end(`${sURL}\n`);
};

export default {
	get,
};
