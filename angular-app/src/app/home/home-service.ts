import { Injectable } from "@angular/core";
import * as io from "socket.io-client";
import {} from "rxjs/observable";
import { Observable } from "rxjs";

// const socketList: io[] = [];

@Injectable({ providedIn: "root" })
export class HomeService {
  private socket = io("https://172.23.1.164:3000", { secure: true });

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
