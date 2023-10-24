import axios from "axios";

const API_URL = "http://localhost:3000/api/messages/";

// Send Message
const sendMessage = async (messageModelData: any, token: any) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.post(API_URL + "send", messageModelData, config);

	return response.data;
};

// Get messages
const getMessages = async (token: any) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.get(API_URL + "get", config);

	return response.data;
};

const messagesService = {
	sendMessage,
	getMessages,
};

export default messagesService;
