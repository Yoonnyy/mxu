import config from "../../config.js";
import generateRndstr from "./generateRndstr.js";

async function multerFilename(
	req: Express.Request,
	file: Express.Multer.File,
	cb: (error: Error | null, filename: string) => void
) {
	const originalFilename = file.originalname;

	if (originalFilename.length > config.MAX_FILE_NAME_LENGTH) {
		file.originalname = originalFilename.substring(
			0,
			config.MAX_FILE_NAME_LENGTH
		);
	}

	cb(null, await generateRndstr());
}

export default multerFilename;
