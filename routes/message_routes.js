const express = require("express");
const messages = require("./../controllers/message_controller");
const router = express.Router();

router.post("/new", messages.createMessage);
// router.get("/", messages.getMessages);
router.get("/", messages.getConvo);

module.exports = router;
