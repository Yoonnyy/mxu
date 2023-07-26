import config from "../../config.js";
import rndstr from "./rndstr.js";

function multerFilename(
	req: Express.Request,
	file: Express.Multer.File,
	cb: (error: Error | null, filename: string) => void
): void {
	const originalFilename = file.originalname;

	if (originalFilename.length > config.MAX_FILE_NAME_LENGTH) {
		file.originalname = originalFilename.substring(
			0,
			config.MAX_FILE_NAME_LENGTH
		);
	}

	cb(null, rndstr(config.SHORTENED_FILE_NAME_LENGTH));
}

export default multerFilename;
