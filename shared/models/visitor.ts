import * as Global from "../helpers/global";
import { alphanumericUnique } from "../helpers/math";

class Visitor {
  protected _id: string;
  public username: string;
  public color: string;

  constructor(id: string) {
    this._id = id;
    this.username =
      Global.costants.BaseUserConfig.usernamePrefix +
      alphanumericUnique().toUpperCase() +
      new Date().toLocaleDateString().replace(/-/g, "");
    this.color = "hsla(" + Math.random() * 360 + ", 80%, 30%, 1)";
  }
}

export { Visitor };
