const express = require("express");
const router = express.Router();
const {
	registerUser,
	loginUser,
	getMe,
	updateUser,
} = require("../controllers/usersController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.patch("/", protect, updateUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);

module.exports = router;
