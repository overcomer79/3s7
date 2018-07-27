import * as JWT from "jsonwebtoken";
import * as conf from "./../../shared/config/keys";
import User, { IUser } from "./../models/user";
import { NextFunction } from "express";

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

export const signIn = async (req, res, next: NextFunction) => {
  // Generate token for existing user
  const token = signToken(req.user);
  res.status(200).json({ token });
  console.log("Successful login!");
};

export const signUp = async (req, res, next: NextFunction) => {
  const { email, password } = req.value.body;

  // Check if there is a user with the same email
  const foundUser: IUser = await User.findOne({ "local.email": email });
  if (foundUser) {
    return res.status(403).send({ error: "Email is already in use" });
  }

  // create a new user
  const newUser: IUser = new User({
    method: "local",
    local: {
      email: email,
      password: password
    }
  });
  await newUser.save();

  //response with token
  const token: string = signToken(newUser);
  res.status(200).json({ token });
};

export const googleOAuth = async (req, res, next) => {
  //Generate token
  const token: string = signToken(req.user);
  res.status(200).json({ token });
};

export const facebookOAuth = async (req, res, next) => {
  //Generate token
  const token: string = signToken(req.user);
  res.status(200).json({ token });
};

export const secret = async (req, res, next) => {
  console.log("I managed to get here!");
  res.json({ secret: "resource" });
};
