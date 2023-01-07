import { Router } from "express";
const router = Router();

// Controllers
import index from "./controllers/index.js";

// Middleware 
import handelUpload from "./middleware/handleUpload.js";

router.route("/").post(handelUpload, index.post);

export default router;
