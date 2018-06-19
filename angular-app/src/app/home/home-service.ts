import { Injectable } from "@angular/core";
import * as io from "socket.io-client";
import {} from "rxjs/observable";
import { Observable } from "rxjs";

// const socketList: io[] = [];

@Injectable({ providedIn: "root" })
export class HomeService {
  private socket = io("https://172.23.1.164:3000", { secure: true });

  newUserConnected() {
    const observable = new Observable<number>(observer => {
      /* This avoid multiple connections on the same page */
      /* No more needed with singleton strategy

      socketList.push(this.socket);
      if (socketList.length > 1) {
        socketList[socketList.length - 2].disconnect();
        socketList.shift();
      }
      */
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

  sendMessage(data) {
    this.socket.emit("message", data);
  }

  newMessageReceived() {
    const observable = new Observable<{
      user: String;
      color: String;
      message: String;
      date: Date;
    }>(observer => {
      this.socket.on("addToChat", data => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });

    return observable;
  }

  userLeftRoom() {
    const observable = new Observable<{ user: String; message: String }>(
      observer => {
        this.socket.on("left room", data => {
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
