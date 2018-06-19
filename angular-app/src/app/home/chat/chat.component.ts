import { Component, OnInit } from "@angular/core";
import { HomeService } from "../../home/home-service";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"],
  providers: []
})
export class ChatComponent implements OnInit {
  user: String;
  messageText: String;
  messageArray: Array<{
    user: String;
    color: String;
    message: String;
    date: Date;
    type: string;
  }> = [];

  constructor(private _homeService: HomeService) {}

  ngOnInit() {
    this._homeService.newUserJoined().subscribe(data => {
      this.messageArray.push({
        user: data.user,
        color: "#a3d063",
        message: data.message,
        date: new Date(),
        type: "info"
      });
    });

    this._homeService.userLeftRoom().subscribe(data => {
      this.messageArray.push({
        user: data.user,
        color: "#f5886e",
        message: data.message,
        date: new Date(),
        type: 'info'
      });
    });

    this._homeService.newMessageReceived().subscribe(data => {
      this.messageArray.push({
        user: data.user,
        color: data.color,
        message: data.message,
        date: data.date,
        type: data.user === this.user ? "left" : "right"
      });
    });

    this._homeService.getUserName().subscribe(data => {
      this.user = data;
    });
  }
  sendMessage() {
    this._homeService.sendMessage({
      room: "app",
      message: this.messageText
    });
    this.messageText = "";
  }

}
