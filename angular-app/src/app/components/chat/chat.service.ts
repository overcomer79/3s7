import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { LogMessage } from "../../../../../shared/models/chat_messages/logMessage";
import { GeneralInfoSocketService } from "../../services/socket/general-info-socket.service";
import { ChatSocketService } from "../../services/socket/chat-socket.service";

@Injectable({
  providedIn: "root"
})
export class ChatService {
  user: string;
  messages: Subject<any>;
  evalMessages: Subject<any>;
  roomJoins: Observable<LogMessage>;
  roomLeaves: Observable<LogMessage>;
  connectedUser: Observable<string>;

  constructor(
    private _csService: ChatSocketService,
    private _gisocketService: GeneralInfoSocketService
  ) {
    this.messages = <Subject<any>>_csService.chat().map(
      (response: any): any => {
        return response;
      }
    );

    this.evalMessages = <Subject<any>>_csService.evalLog().map(
      (response: any): any => {
        return response;
      }
    );

    this.roomJoins = <Observable<LogMessage>>(
      _gisocketService.userJoinRoom().map(
        (response: any): any => {
          return response;
        }
      )
    );

    this.roomLeaves = <Observable<LogMessage>>(
      _gisocketService.userLeftRoom().map(
        (response: any): any => {
          return response;
        }
      )
    );
    this.connectedUser = <Observable<any>>_gisocketService.connectedUser().map(
      (response: any): any => {
        this.user = response;
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

  joinRoom(data) {
    this._csService.joinRoom(data);
  }

  leaveRoom(data) {
    this._csService.leaveRoom(data);
  }
}
