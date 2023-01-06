import { Router } from "express";
const router = Router();

// Controllers
import index from "./controllers/index.js";

router.route("/").get(index.get);

export default router;
