import { Injectable } from "@angular/core";
import * as io from "socket.io-client";
import {} from "rxjs/observable";
import { Observable } from "rxjs";

const socketList: io[] = [];

@Injectable({ providedIn: "root" })
export class HomeService {
  private socket = io("https://localhost:3000", { secure: true });

  newUserConnected() {
    const observable = new Observable<number>(observer => {
      /* This avoid multiple connections on the same page */
      socketList.push(this.socket);
      if (socketList.length > 1) {
        socketList[socketList.length - 2].disconnect();
        socketList.shift();
      }
      /***************************************************/

      this.socket.on("ServerMsg", data => {
        observer.next(data.numberOfUser);
      });
      return () => {
        this.socket.disconnect();
      };
    });

    return observable;
  }

  getUserName() {
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

  newUserJoined() {
    const observable = new Observable<{ user: String; message: String }>(
      observer => {
        this.socket.on("new user joined", data => {
          observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
      }
    );

    return observable;
  }
}
