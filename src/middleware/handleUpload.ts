import { Request, Response, NextFunction } from "express";
import formidable from "formidable";
import config from "../../config.js";
import { rm } from "fs";

export default (req: Request | any, res: Response, next: NextFunction) => {
	
	const form = formidable({
		allowEmptyFiles: false,
		maxFiles: 1,
		maxFileSize: 1024 * 1024 * 1024 * 1024, // this value doesnt mean anything. even if i handle the error it still creates a file(0 bytes) and doesn't give any info(name) about it.
		keepExtensions: true,
	});

	// parse form data for files & fileds
	form.parse(req, (err: Error, fields, files) => {
		const file: any = files.file;
		
		if(file){			
			if (file.size > config.MAX_CONTENT_SIZE) {
				rm(file.filepath, (err) => {});			
				return res.end(
					`max file size exceeded (max file size: ${
						config.MAX_CONTENT_SIZE / 1024 / 1024
					}MB)\n`
				);
			}
			// Truncate file name
			if (file.originalFilename.length > config.MAX_CONTENT_NAME_LENGTH) {
				file.originalFilename = file.originalFilename.substring(0, config.MAX_CONTENT_NAME_LENGTH)
			}
		}


		// TODO: blacklisted mime types

		req.fields = fields;
		req.files = files;
		next();
	});
};
