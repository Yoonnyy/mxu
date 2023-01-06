import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";

import router from "./routes.js";

dotenv.config();

const app = express();

app.set("PORT", process.env.PORT || 1315);

app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

export default app;
