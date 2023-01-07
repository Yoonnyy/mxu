import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import router from "./routes.js";
import config from "../config.js"


const app = express();

app.set("PORT", config.PORT || 1315);

app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public", { extensions: ["html"] }));

app.use(router);

export default app;
