const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

const Users = require("../database/models/users");

const registerUser = asyncHandler(async (req, res) => {
	const { first_name, last_name, username, email, password } = req.body;

	if (!first_name || !last_name || !username || !email || !password) {
		res.status(400);
		throw new Error("Please add all fields");
	}

	// Check if user exists
	const userExists = await Users.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error("User already exists");
	}

	// Hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	// Create user
	const user = await Users.create({
		first_name,
		last_name,
		username,
		email,
		password: hashedPassword,
	});

	if (user) {
		res.status(201).json({
			_id: user._id,
			first_name: user.first_name,
			last_name: user.last_name,
			username: user.username,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error("Invalid user data");
	}
});

const updateUser = asyncHandler(async (req, res) => {
	const { first_name, last_name, username, email, _id } = req.body;

	try {
		let user;

		customer = await Users.findOneAndUpdate(
			{ _id: _id },
			{ first_name: first_name, last_name: last_name, username: username },
			{ new: true }
		).exec();

		res.status(201).json({
			_id: user._id,
			first_name: user.first_name,
			last_name: user.last_name,
			username: user.username,
			email: user.email,
			token: generateToken({
				_id: user._id,
				first_name: user.first_name,
				last_name: user.last_name,
				username: user.username,
				email: user.email,
			}),
		});
	} catch (err) {
		console.log(err);
	}
});

const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	// Check for user email
	const user = await Users.findOne({ email });

	if (user && (await bcrypt.compare(password, user.password))) {
		res.json({
			_id: user.id,
			first_name: user.first_name,
			last_name: user.last_name,
			username: user.username,
			email: user.email,
			token: generateToken({
				_id: user._id,
				first_name: user.first_name,
				last_name: user.last_name,
				username: user.username,
				email: user.email,
			}),
		});
	} else {
		res.status(400);
		throw new Error("Invalid credentials");
	}
});

const getMe = asyncHandler(async (req, res) => {
	res.status(200).json(req.user);
});

// Generate JWT
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});
};

module.exports = {
	registerUser,
	loginUser,
	getMe,
	updateUser,
};
