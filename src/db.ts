import { DataSource } from "typeorm";
import File from "./models/File.js";
import Url from "./models/Url.js";
import Shortened from "./models/Shortened.js";
import config from "../config.js";

const AppDataSource = new DataSource({
	type: "sqlite",
	database: config.DATABASE_NAME,
	entities: [File, Url, Shortened],
	logging: config.LOGGING,
	synchronize: true,
});

function connect() {
	AppDataSource.initialize()
		.then(() => {
			console.info("DATABASE INITIALIZATION: SUCCESS");
		})
		.catch((err) => {
			console.error("DATABASE INITIALIZATION: FAILUARE");
			console.error(err);
		});
	return AppDataSource;
}

export default connect;