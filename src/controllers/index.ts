import { Request, Response } from "express";

const get = (req: Request, res: Response) => {
	res.end("uwu");
};

const post = (req: Request, res: Response) => {
	res.end("uwu");
};

export default {
	get,
	post,
};
