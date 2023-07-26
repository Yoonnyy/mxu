import { Request, Response, NextFunction } from "express";
import config from "../../config.js";
import multer from "multer";
import multerFilename from "../utils/multerFilename.js";


// handle upload
const storage = multer.diskStorage({
	destination: config.STORAGE_PATH,
	filename: multerFilename,
});
const upload = multer({
	storage,
	limits: { files: 1, fileSize: config.MAX_FILE_SIZE },
	
}).single("file");


export default (req: Request, res: Response, next: NextFunction) => {
	upload(req, res, (err) => {
		if (err instanceof multer.MulterError) {
			switch (err.code) {
				case "LIMIT_FILE_SIZE":
					return res.status(400).end("the file you uploaded is too big\n")
				default:
					return res.status(400).end("error while uploading\n")
			}
		} 
		else if (err) {
			return res.status(500).end("error while uploading\n");
		}
		next();
	},)
}