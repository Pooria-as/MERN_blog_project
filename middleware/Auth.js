const jwt = require("jsonwebtoken");
const config = require("config");

const Auth = (req, res, next) => {
  //get token from header
  const token = req.header("x-auth-token");
  //check if !token
  if (!token) {
    res.status(401).send({ mesg: "token not found sorry buddy" });
  }

  try {
    //verify token
    const decode = jwt.verify(token, config.get("jwtSecret"));
    req.user = decode.user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send({ mes: "Token is incorrect !" });
  }
};

module.exports = Auth;
