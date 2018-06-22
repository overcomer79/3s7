import { Visitor } from "../visitor";

// Message for logging info about visitor user
export class LogMessage {
  public user: Visitor;
  public message: string;

  constructor(user: Visitor, message: string){
      this.user = user;
      this.message = message;
  }
}
