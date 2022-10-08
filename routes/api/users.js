const express = require("express");
const router = express.Router();

const { CreateNewUser } = require("../../controller/UserController");

//validation roles for users

//@route /api/users

router.post("/", CreateNewUser);

module.exports = router;
