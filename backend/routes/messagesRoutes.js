const express = require("express");
const router = express.Router();
const {
	sendMessage,
	getMessages,
} = require("../controllers/messagesController");
const { protect } = require("../middleware/authMiddleware");

router.post("/sendMessage", protect, sendMessage);
router.get("/getMessages", protect, getMessages);

module.exports = router;
