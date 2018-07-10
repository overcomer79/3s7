import { Schema, Model, model } from "mongoose";
import * as bcrypt from "bcryptjs";
import { IUserDocument } from "../interfaces/IUserDocument";
import { ConnectedVisitor } from "./connectedVisitors";

export interface IUser extends IUserDocument, ConnectedVisitor {
  isValidPassword(password: string): Promise<boolean>;
}

export interface IUserModel extends Model<IUser> {
  hashPassword(password: string): Promise<boolean>;
}

// create a schema
export const userSchema: Schema = new Schema({
  method: {
    type: String,
    enum: ["local", "google", "facebook"],
    required: true
  },
  local: {
    email: {
      type: String,
      lowercase: true
    },
    password: {
      type: String
    }
  },
  google: {
    id: {
      type: String
    },
    email: {
      type: String,
      lowercase: true
    }
  },
  facebook: {
    id: {
      type: String
    },
    email: {
      type: String,
      lowercase: true
    }
  }
});

userSchema.pre("save", async function(this: any, next) {
  try {
    if (this.method !== "local") {
      next();
    }
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Generate a password hash (salt + hash)
    const passwordHash = await bcrypt.hash(this.local.password, salt);
    // Re-assign hashed version over original, plain text password
    this.local.password = passwordHash;
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.method("isValidPassword", async function(
  newPassword: string
): Promise<boolean> {
  try {
    return await bcrypt.compare(newPassword, this.local.password);
  } catch (err) {
    throw new Error(err);
  }
});

// create a model
export const User: IUserModel = model<IUser, IUserModel>("User", userSchema);
export default User;
