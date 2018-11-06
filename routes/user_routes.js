const express = require("express");
const user = require("./../controllers/user_controllers");
const router = express.Router();

router.post("/create", user.create);
router.post("/login", user.login);
router.get("/all", user.getAll);
router.put("/logout/:email", user.changeStatusToLoggedOut);

module.exports = router;
