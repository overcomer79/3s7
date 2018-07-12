import { Injectable } from "@angular/core";
import * as io from "socket.io-client";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { environment } from "../../../environments/environment";
import "rxjs/add/operator/map";
import { MessagePack } from '../../../../../shared/models/socket_messages/messagePack';
import { ConnectedUsersInfo } from "../../../../../shared/models/connectedUsersInfo";
import { LogMessage } from "../../../../../shared/models/socket_messages/logMessage";

@Injectable({
  providedIn: "root"
})
export class WebsocketService {
  private socket = io(environment.ws_url, { secure: true });

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
        console.log(data);
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

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
   const observable = new Observable<{
      user: String;
      color: String;
      message: String;
      date: Date;
    }>(obs => {
      this.socket.on("addToChat", data => {
        obs.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });

    const observer = {
      next: (data: Object) => {
        this.socket.emit("message", data);
      }
    };
    return Subject.create(observer, observable);
  }
}
