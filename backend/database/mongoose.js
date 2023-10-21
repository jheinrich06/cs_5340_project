const mongoose = require("mongoose");
require("dotenv").config();

mongoose.Promise = global.Promise;

mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Database Connected"))
	.catch((error) => console.log(error));

module.exports = mongoose;
