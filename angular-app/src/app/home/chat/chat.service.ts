import { Injectable } from "@angular/core";
import { WebsocketService } from "../../websocket.service";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

@Injectable({
  providedIn: "root"
})
export class ChatService {
  messages: Subject<any>;
  evalMessages: Subject<any>;
  roomJoins: Observable<any>;
  roomLeaves: Observable<any>;
  connectedUser: Observable<any>;

  // Our constructor calls our wsService connect method
  constructor(private _wsService: WebsocketService) {
    this.messages = <Subject<any>>_wsService.chat().map(
      (response: any): any => {
        return response;
      }
    );

    this.evalMessages = <Subject<any>>_wsService.evalLog().map(
      (response: any): any => {
        return response;
      }
    );

    this.roomJoins = <Observable<any>>_wsService.userJoinRoom().map(
      (response: any): any => {
        return response;
      }
    );

    this.roomLeaves = <Observable<any>>_wsService.userLeftRoom().map(
      (response: any): any => {
        return response;
      }
    );

    this.connectedUser = <Observable<any>>_wsService.connectedUser().map(
      (response: any): any => {
        return response;
      }
    );
  }

  sendMsg(msg) {
    if (msg.message && msg.message[0] === "/") {
      this.evalMessages.next(msg.message.slice(1));
    } else {
      this.messages.next(msg);
    }
  }
}
