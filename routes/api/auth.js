const express = require("express");
const Auth = require("../../middleware/Auth");
const { ApiAuth, FindUserByToken } = require("../../controller/AuthController");
const router = express.Router();

//@route /api/auth GET
router.get("/", Auth, FindUserByToken);
router.post("/", ApiAuth);

//@route /api/auth POST

//Authuntication for api Post

router.post("/", ApiAuth);
module.exports = router;
