import { Injectable } from "@angular/core";
import { WebsocketService } from "../../websocket.service";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

@Injectable({
  providedIn: "root"
})
export class ChatService {
  messages: Subject<any>;
  roomJoins: Observable<any>;
  roomLeaves: Observable<any>;

  // Our constructor calls our wsService connect method
  constructor(private _wsService: WebsocketService) {
    this.messages = <Subject<any>>_wsService.chat().map(
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
  }

  // Our simplified interface for sending
  // messages back to our socket.io server
  sendMsg(msg) {
    this.messages.next(msg);
  }
}
