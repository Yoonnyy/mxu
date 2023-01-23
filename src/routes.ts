import { Router } from "express";
import multer from "multer";
import config from "../config.js";
const router = Router();

// Utils 
import multerFilename from "./utils/multerFilename.js";

// Controllers
import index from "./controllers/index.js";
import sURL from "./controllers/sURL.js";

// Middleware
// import handelUpload from "./middleware/handleUpload.js";

// handle upload
const storage = multer.diskStorage({
	destination: config.STORAGE_PATH,
	filename: multerFilename
});
const upload = multer({ storage, limits: { files: 1, fileSize: config.MAX_FILE_SIZE} });

router.route("/").post(upload.single("file"), index.post);

router.route("/:sURL").get(sURL.get);

export default router;

// TODO: Handle multer errors (too many files, File too large, etc...)
// TODO: handle downloads