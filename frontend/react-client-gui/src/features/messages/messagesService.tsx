import axios from "axios";

const API_URL = "http://localhost:3000/api/messages/";

// Send Message
const sendMessage = async (messageModelData: any, token: any) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.post(
		API_URL + "sendMessage",
		messageModelData,
		config
	);

	return response.data;
};

// Get messages
const getMessages = async (token: any) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.get(API_URL + "getMessages", config);

	return response.data;
};

const messagesService = {
	sendMessage,
	getMessages,
};

export default messagesService;
