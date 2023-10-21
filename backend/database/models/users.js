const mongoose = require("mongoose");

const usersSchema = mongoose.Schema(
	{
		first_name: {
			type: String,
			required: [true, "Please add a first name"],
		},
		last_name: {
			type: String,
			required: [true, "Please add a last name"],
		},
		username: {
			type: String,
			required: [true, "Please add a username"],
		},
		email: {
			type: String,
			required: [true, "Please add an email"],
			unique: true,
		},
		password: {
			type: String,
			required: [true, "Please add a password"],
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Users", usersSchema);
