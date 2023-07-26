import { Router } from "express";
import config from "../config.js";
const router = Router();

// Controllers
import index from "./controllers/index.js";
import sURL from "./controllers/sURL.js";

import fileUpload from "./middleware/fileUpload.js";

router.route("/").post(
	fileUpload,
	index.post);

router.route("/:sURL").get(sURL.get);

export default router;

// TODO: Handle multer errors (too many files, File too large, etc...)
// TODO: handle downloads
