import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs/Observable";
import { LogMessage } from "../../../../../shared/models/chat_messages/logMessage";
import { Subject } from "rxjs/Subject";
import { MessageInfo, MessageType } from "../../../../../shared/helpers/global";
import * as io from "socket.io-client";

@Injectable({
  providedIn: "root"
})
export class ChatSocketService {
  private socket = io(environment.ws_url + environment.socket_namespace.chat, {
    secure: true
  });

  evalLog(): Subject<MessageEvent> {
    const observable = new Observable<any>(obs => {
      this.socket.on("evalAnswer", data => {
        obs.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });

    const observer = {
      next: (data: Object) => {
        this.socket.emit("evalServer", data);
      }
    };
    return Subject.create(observer, observable);
  }

  chat(): Subject<MessageEvent> {
    const observable = new Observable<any>(obs => {
      this.socket.on("addToChat", data => {
        obs.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });

    const observer = {
      next: (data: Object) => {
        this.socket.emit(MessageInfo.get(MessageType.CHAT_MESSAGE), data);
      }
    };
    return Subject.create(observer, observable);
  }
}
