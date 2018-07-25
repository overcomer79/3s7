import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs/Observable";
import { ConnectedUsersInfo } from "../../../../../shared/models/socket_messages/connectedUsersInfo";
import { MessagePack } from "../../../../../shared/models/socket_messages/messagePack";
import { LogMessage } from "../../../../../shared/models/chat_messages/logMessage";

import * as io from "socket.io-client";

@Injectable({
  providedIn: "root"
})
export class GeneralInfoSocketService {
  private socket = io(
    environment.ws_url + environment.socket_namespace.general,
    { secure: true }
  );

  connectedUsersInfo(): Observable<ConnectedUsersInfo> {
    const observable = new Observable<ConnectedUsersInfo>(observer => {
      this.socket.on("ServerMsg", (data: MessagePack) => {
        observer.next(data.usersInfo);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  connectedUser(): Observable<any> {
    const observable = new Observable<String>(observer => {
      this.socket.on("connected user", data => {
        observer.next(data.user.username);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
  userJoinRoom(): Observable<LogMessage> {
    const observable = new Observable<LogMessage>(observer => {
      this.socket.on("new user joined", (data: LogMessage) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  userLeftRoom(): Observable<LogMessage> {
    const observable = new Observable<LogMessage>(observer => {
      this.socket.on("left room", (data: LogMessage) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
}
