import axios from "axios";

const API_URL = "http://localhost:3000/api/users/";

// Register user
const register = async (userData: any) => {
	const response = await axios.post(API_URL, userData);

	if (response.data) {
		localStorage.setItem("user", JSON.stringify(response.data));
	}

	return response.data;
};

// Update User Details
const updateUserDetails = async (userData: any, token: any) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.patch(API_URL, userData, config);

	return response.data;
};

// Change User Password
const updateUserPassword = async (userData: any, token: any) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.patch(API_URL + "password", userData, config);

	return response.data;
};

// Login user
const login = async (userData: any) => {
	const response = await axios.post(API_URL + "login", userData);

	if (response.data) {
		localStorage.setItem("user", JSON.stringify(response.data));
	}

	return response.data;
};

// Logout user
const logout = () => {
	localStorage.removeItem("user");
};

const authService = {
	register,
	logout,
	login,
	updateUserDetails,
	updateUserPassword,
};

export default authService;
