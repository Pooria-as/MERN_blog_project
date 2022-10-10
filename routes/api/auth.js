const express = require("express");
const Auth = require("../../middleware/Auth");
const { ApiAuth, FindUserByToken } = require("../../controller/AuthController");
const router = express.Router();

//@route /api/auth GET
//Authuntication for api Post
router.get("/", Auth, FindUserByToken);
//@route /api/auth POST
router.post("/", ApiAuth);

module.exports = router;
