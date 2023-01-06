import app from "./app.js";


app.listen(app.get("PORT"), () => {
	console.log(`App: Listening on port: ${app.get("PORT")}`);

});