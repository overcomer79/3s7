import * as JWT from "jsonwebtoken";
import * as conf from "../../shared/config/keys";
import User from "../models/user";

const signToken = user => {
  return JWT.sign(
    {
      iss: "3s7",
      sub: user.id,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1)
    },
    conf.keys.jwt.secret
  );
};

export const signIn = async (req, res, next) => {
  // Generate token for existing user
  const token = signToken(req.user);
  res.status(200).json({ token });
  console.log("Successful login!");
};

export const signUp = async (req, res, next) => {
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
};

export const googleOAuth = async (req, res, next) => {
  //Generate token
  const token = signToken(req.user);
  res.status(200).json({ token });
};

export const facebookOAuth = async (req, res, next) => {
  //Generate token
  const token = signToken(req.user);
  res.status(200).json({ token });
};
