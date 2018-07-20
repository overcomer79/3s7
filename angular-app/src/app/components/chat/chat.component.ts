import { Component, OnInit } from "@angular/core";
import { ChatService } from "./chat.service";
import { LogMessage } from "../../../../../shared/models/chat_messages/logMessage";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"],
  providers: []
})
export class ChatComponent implements OnInit {
  room: "app";
  user: String;
  messageText: String;
  messageArray: Array<{
    user: String;
    color: String;
    message: String;
    date: Date;
    type: string;
  }> = [];

  constructor(private _chatService: ChatService) {}

  ngOnInit() {
    this._chatService.roomJoins.subscribe((data: LogMessage) => {
      this.messageArray.push({
        user: data.user.username,
        color: "#a3d063",
        message: data.message,
        date: new Date(),
        type: "info"
      });
    });
    this._chatService.roomLeaves.subscribe((data: LogMessage) => {
      this.messageArray.push({
        user: data.user.username,
        color: "#f5886e",
        message: data.message,
        date: new Date(),
        type: "info"
      });
    });
    this._chatService.messages.subscribe(data => {
      this.messageArray.push({
        user: data.user,
        color: data.color,
        message: data.message,
        date: data.date,
        type: data.user === this.user ? "right" : "left"
      });
    });

    this._chatService.connectedUser.subscribe(data => {
      this.user = data;
    });

    this._chatService.evalMessages.subscribe(data => {
      console.log(data);
    });
  }

  sendMessage() {
    this._chatService.sendMsg({
      room: "app",
      message: this.messageText
    });
    this.messageText = "";
  }
}
