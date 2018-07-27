import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { Subject } from "rxjs";
import "rxjs/add/operator/takeUntil";

// From Frontend
import { ChatService } from "./chat.service";

// From Backend
import { LogMessage } from "../../../../../shared/models/chat_messages/logMessage";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"],
  providers: []
})
export class ChatComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<any> = new Subject();
  room: string;
  messageText: String;

  // TODO: this should be an array of already defined object
  messageArray: Array<{
    user: String;
    color: String;
    message: String;
    date: Date;
    type: string;
  }> = [];

  constructor(private _chatService: ChatService, router: Router) {
    router.events.forEach(e => {
      if (e instanceof NavigationEnd) {
        this.room = e.url;
      }
    });
  }

  ngOnInit() {
    this._chatService.joinRoom(this.room);

    // TODO: should use takeUntil
    this._chatService.roomJoins
      // .takeUntil(this.unsubscribe)
      .subscribe((data: LogMessage) => {
        this.messageArray.push({
          user: data.user.username,
          color: "#a3d063",
          message: data.message,
          date: new Date(),
          type: "info"
        });
      });

    // TODO: should use takeUntil
    this._chatService.roomLeaves
      // .takeUntil(this.unsubscribe)
      .subscribe((data: LogMessage) => {
        this.messageArray.push({
          user: data.user.username,
          color: "#f5886e",
          message: data.message,
          date: new Date(),
          type: "info"
        });
      });

    // TODO: should use takeUntil
    this._chatService.connectedUser
      // .takeUntil(this.unsubscribe)
      .subscribe();

    this._chatService.messages.takeUntil(this.unsubscribe).subscribe(data => {
      this.messageArray.push({
        user: data.user,
        color: data.color,
        message: data.message,
        date: data.date,
        type: data.user === this._chatService.user ? "right" : "left"
      });
    });

    // TODO: should use takeUntil
    this._chatService.evalMessages
      // .takeUntil(this.unsubscribe)
      .subscribe(data => {
        console.log(data);
      });
  }

  ngOnDestroy() {
    this._chatService.leaveRoom(this.room);
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  sendMessage() {
    this._chatService.sendMsg(this.messageText);
    this.messageText = "";
  }
}
