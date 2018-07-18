import { Schema, Model, model } from "mongoose";
import * as bcrypt from "bcryptjs";
import { IUserDocument } from "../interfaces/IUserDocument";
import { ConnectedVisitor } from "./connectedVisitors";
import { NextFunction } from "../../node_modules/@types/express-serve-static-core";

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
      type: Schema.Types.String,
      lowercase: true
    },
    password: {
      type: Schema.Types.String
    }
  },
  google: {
    id: {
      type: Schema.Types.String
    },
    email: {
      type: Schema.Types.String,
      lowercase: true
    }
  },
  facebook: {
    id: {
      type: Schema.Types.String
    },
    email: {
      type: Schema.Types.String,
      lowercase: true
    }
  }
});

userSchema.pre("save", async function(this: any, next: NextFunction) {
  try {
    if (this.method !== "local") {
      next();
    }
    // Generate a salt
    const salt: string = await bcrypt.genSalt(10);
    // Generate a password hash (salt + hash)
    const passwordHash: string = await bcrypt.hash(this.local.password, salt);
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
