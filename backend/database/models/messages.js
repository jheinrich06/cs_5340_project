const mongoose = require("mongoose");

const messagesSchema = mongoose.Schema(
	{
		sender_id: { type: String },
		sender_first_name: {
			type: String,
		},
		sender_last_name: {
			type: String,
		},
		sender_username: {
			type: String,
		},
		sent_message: {
			type: String,
		},
		time_sent: {
			type: Date,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Messages", messagesSchema);
