import { Router } from "express";
const router = Router();

// Controllers
import index from "./controllers/index.js";
import sURL from "./controllers/sURL.js";

// Middleware
import handelUpload from "./middleware/handleUpload.js";

router.route("/").post(handelUpload, index.post);

router.route("/:sURL").get(sURL.post);

export default router;
