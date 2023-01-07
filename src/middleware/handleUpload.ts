import { Request, Response, NextFunction } from "express";
import formidable from "formidable";
import config from "../../config.js";

export default (req: Request | any, res: Response, next: NextFunction) => {
	const form = formidable({
		allowEmptyFiles: false,
		maxFiles: 1,
		maxTotalFileSize: config.MAX_CONTENT_SIZE,
		keepExtensions: true,
	});

	form.parse(req, (err, fields, files) => {
		if (err) {
			console.error(err);
			return next(err);
		}
		req.fields = fields;
		req.files = files;
		next()
	});
};
