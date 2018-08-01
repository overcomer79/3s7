import User, { IUser } from "../models/user";

export const users_get_user_by_id = async (req, res, next) => {
  const foundUser: IUser = await User.findById(req.params.userId);
  if (!foundUser) {
    return res.status(204).send({ error: "user not found" });
  }
  res.status(200).json({ user: foundUser });
};

//FIXME: No send password
//      hint: look at js old files
export const users_get_all = async (req, res, next) => {
  const users: IUser[] = await User.find({});
  return res.status(200).send(users);
};
