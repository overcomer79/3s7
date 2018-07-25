import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { LogMessage } from "../../../../../shared/models/chat_messages/logMessage";
import { WebsocketService } from "../../services/socket/websocket.service";

@Injectable({
  providedIn: "root"
})
export class ChatService {
  messages: Subject<any>;
  evalMessages: Subject<any>;
  roomJoins: Observable<LogMessage>;
  roomLeaves: Observable<LogMessage>;
  connectedUser: Observable<any>;

  // Our constructor calls our wsService connect method
  constructor(private _wsService: WebsocketService) {
    //this._wsService.setNameSpace('/tris');
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

    this.roomJoins = <Observable<LogMessage>>_wsService.userJoinRoom().map(
      (response: any): any => {
        return response;
      }
    );

    this.roomLeaves = <Observable<LogMessage>>_wsService.userLeftRoom().map(
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

  setNamespace(nsp) {
    this._wsService.setNameSpace(nsp);
  }
}
