const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("config");
const Joi = require("joi");

module.exports = {
  ApiAuth: async (req, res) => {
    const { email, password } = req.body;

    //validtion for data entring
    const querySchema = Joi.object({
      email: Joi.string().required().email(),
      password: Joi.string().min(6).required(),
    });

    const result = querySchema.validate(req.body);
    if (querySchema.validate(req.body).error) {
      res.status(400).send(result.error.details[0].message);
    }

    try {
      //check user exist
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).send(" User Not Found  !");
      }

      //COMPARE user password
      const IsMatchUser = await bcrypt.compare(password, user.password);

      if (!IsMatchUser) {
        return res.status(403).send("Your Password was wrong ! :)");
      }

      //create jwt (jsonwebtoken)
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 489000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.log(error);
    }
  },
  FindUserByToken: async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");
      return res.json(user);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("server error !");
    }
  },
};
