const Joi = require("joi");
const gravatar = require("gravatar");
const bcrypt = require("bcrypt");
const config = require("config");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

module.exports = {
  CreateNewUser: async (req, res) => {
    const { name, email, password } = req.body;

    //validtion for data entring
    const querySchema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().min(6).required(),
    });

    const result = querySchema.validate(req.body);
    if (querySchema.validate(req.body).error) {
      res.status(400).send(result.error);
    }

    try {
      //check user exist
      let user = await User.findOne({ email });
      if (user) {
        res.status(400).json({ msg: "You had been registerd before !" });
      }
      const avatar = await gravatar.url(email);
      // get users avatar

      //set new user in database
      const newUser = new User({
        name,
        email,
        avatar,
        password,
      });
      //encrypt password
      const salt = await bcrypt.genSalt(10);
      // now we set user password to hashed password
      newUser.password = await bcrypt.hash(newUser.password, salt);
      await newUser.save();

      //create jwt (jsonwebtoken)
      const payload = {
        user: {
          id: newUser.id,
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

      // await res.status(200).send("success");
    } catch (error) {
      console.log(error);
    }
  },
};
