import User, { IUser } from "../models/user";
// import * as mongoose from "mongoose";

export const users_get_user_by_id = async (req, res, next) => {
  const foundUser: IUser = await User.findById(req.params.userId);
  if (!foundUser) {
    return res.status(204).send({ error: "user not found" });
  }
  res.status(200).json({ user: foundUser });
};

export const users_get_all = () => {};
