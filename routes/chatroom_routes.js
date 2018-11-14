const express = require("express");
const chatRooms = require("./../controllers/chatroom_controller");
const router = express.Router();
router.post("/new", chatRooms.createChatRoom);
router.get("/all", chatRooms.getAllChatRooms);
router.get("/:id", chatRooms.goToChatRoom);

module.exports = router;
