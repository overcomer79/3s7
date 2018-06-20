import { Injectable } from "@angular/core";
import * as io from "socket.io-client";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { environment } from "../environments/environment";
import "rxjs/add/operator/map";

@Injectable({
  providedIn: "root"
})
export class WebsocketService {
  private socket = io(environment.ws_url, { secure: true });

  connectedUsersInfo(): Observable<any> {
    const observable = new Observable<any>(observer => {
      this.socket.on("ServerMsg", data => {
        observer.next(data.connectedUsersInfo);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  connectedUser(): Observable<any> {
    const observable = new Observable<String>(observer => {
      this.socket.on("connected user", (data) => {
        observer.next(data.user.username);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  userJoinRoom(): Observable<any> {
    const observable = new Observable<any>(observer => {
      this.socket.on("new user joined", data => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  userLeftRoom(): Observable<any> {
    const observable = new Observable<any>(observer => {
      this.socket.on("left room", data => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  chat(): Subject<MessageEvent> {
    const observable = new Observable(obs => {
      this.socket.on("message", data => {
        console.log("Received message from Websocket Server");
        obs.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });

    const observer = {
      next: (data: Object) => {
        this.socket.emit("message", JSON.stringify(data));
      }
    };
    return Subject.create(observer, observable);
  }
}
