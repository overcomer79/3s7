import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs/Observable";
import { LogMessage } from "../../../../../shared/models/chat_messages/logMessage";
import { Subject } from "rxjs/Subject";
import * as io from "socket.io-client";
import { sockets } from "../../../../../shared/config/sockets";

@Injectable({
  providedIn: "root"
})
export class ChatSocketService {
  private socket = io(environment.ws_url + sockets.namespaces.chat, {
    secure: true
  });

  joinRoom(data) {
    this.socket.connect(); // Need to reconnect after unsubscribe
    this.socket.emit(sockets.messages.joinSocketRoom, data);
  }

  leaveRoom(data) {
    this.socket.emit(sockets.messages.leaveSocketRoom, data);
  }

  evalLog(): Subject<MessageEvent> {
    const observable = new Observable<any>(obs => {
      this.socket.on(sockets.messages.evalAnswer, data => {
        obs.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });

    const observer = {
      next: (data: Object) => {
        this.socket.emit(sockets.messages.evalFromServer, data);
      }
    };
    return Subject.create(observer, observable);
  }

  chat(): Subject<MessageEvent> {
    const observable = new Observable<any>(obs => {
      this.socket.on(sockets.messages.chat, data => {
        obs.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });

    const observer = {
      next: (data: Object) => {
        this.socket.emit(sockets.messages.chat, data);
      }
    };
    return Subject.create(observer, observable);
  }
}
