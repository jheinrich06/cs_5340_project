require("./config/config");
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("./database/mongoose");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	bodyParser.json({
		verify: (req, res, buf) => {
			req.rawBody = buf;
		},
	})
);

app.use(passport.initialize());

app.get("/", (req, res) => {
	res.status(200);
	res.send("Welcome to root URL of Server");
});

app.use("/api/users", cors(), require("./routes/usersRoutes"));
app.use("/api/messages", cors(), require("./routes/messagesRoutes"));

app.listen(PORT, (error) => {
	if (!error)
		console.log(
			"Server is Successfully Running, and App is listening on port " + PORT
		);
	else console.log("Error occurred, server can't start", error);
});
