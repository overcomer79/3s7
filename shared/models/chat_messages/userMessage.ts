/**
 * It defines the Message that a user sends for the chat
 */
export class UserMessage {
    user: string;
    color: string;
    message: string;
    date: Date;
  
    constructor(message: UserMessage) {
      this.user = message.user;
      this.color = message.color;
      this.message = message.message;
      this.date = message.date;
    }
  }