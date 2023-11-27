const asyncHandler = require("express-async-handler");

const Messages = require("../database/models/messages");

const sendMessage = asyncHandler(async (req, res) => {
	const {
		sender_id,
		sender_first_name,
		sender_last_name,
		sender_username,
		sent_message,
	} = req.body;

	try {
		let message;

		message = await Messages.create({
			sender_id: sender_id,
			sender_first_name: sender_first_name,
			sender_last_name: sender_last_name,
			sender_username: sender_username,
			sent_message: sent_message,
			time_sent: Date.now(),
		});

		res.status(201).json({
			_id: message._id,
			sender_first_name: message.sender_first_name,
			sender_last_name: message.sender_last_name,
			sender_username: message.sender_username,
			sent_message: message.sent_message,
			time_sent: message.time_sent,
		});
	} catch (err) {
		console.log(err);
	}
});

const getMessages = asyncHandler(async (req, res) => {
	let messages;
	messages = await Messages.find();
	res.status(200).json(messages);
});

module.exports = {
	sendMessage,
	getMessages,
};
