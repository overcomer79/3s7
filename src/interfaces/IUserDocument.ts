import { Document } from "mongoose";

export interface IUserDocument extends Document {
  method: string;
  local: {
    email: String;
    password: String;
  };
  google: {
    id: String;
    email: String;
  };
  facebook: {
    id: String;
    email: String;
  };
}
