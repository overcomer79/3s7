import * as Global from "../helpers/global";
import { alphanumericUnique } from "../helpers/math";

/**
 * Base User to the app.
 * It has
 *  - Internal ID
 *  - Username
 *  - Random Color
 */
class Visitor {
  protected socketId: string;
  public username: string;
  public color: string;

  constructor(id: string) {
    this.socketId = id;
    this.username =
      Global.costants.BaseUserConfig.usernamePrefix +
      alphanumericUnique().toUpperCase() +
      new Date().toLocaleDateString().replace(/-/g, "");
    this.color = "hsla(" + Math.random() * 360 + ", 80%, 30%, 1)";
  }
}

export { Visitor };
