const JWT = require("jsonwebtoken");
const User = require("../models/user");
const keys = require("../config/keys");

signToken = user => {
  return (token = JWT.sign(
    {
      iss: "3s7",
      sub: user.id,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1)
    },
    keys.jwt.secret
  ));
};

module.exports = {
  signUp: async (req, res, next) => {
    const { email, password } = req.value.body;

    // Check if there is a user with the same email
    const foundUser = await User.findOne({ "local.email": email });
    if (foundUser) {
      return res.status(403).send({ error: "Email is already in use" });
    }

    // create a new user
    const newUser = new User({
      method: "local",
      local: {
        email: email,
        password: password
      }
    });
    await newUser.save();

    //response with token
    const token = signToken(newUser);
    res.status(200).json({ token });
  },

  signIn: async (req, res, next) => {
    // Generate token for existing user
    const token = signToken(req.user);
    res.status(200).json({ token });
    console.log("Successful login!");
  },

  googleOAuth: async (req, res, next) => {
    //Generate token
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  facebbokOAuth: async (req, res, next) =>{
      //Generate token
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  secret: async (req, res, next) => {
    console.log("I managed to get here!");
    res.json({ secret: "resource" });
  }
};
