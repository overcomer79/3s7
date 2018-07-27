import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { sockets } from "../../../../../shared/config/sockets";
import { Observable } from "rxjs/Observable";
import { IRoomsHomeReponse } from "../../../../../shared/models/responses/home";
import * as io from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class HomeSocketService {

  private socket = io(environment.ws_url + sockets.namespaces.home, {
    secure: true
  });

  getServerResponse(): Observable<IRoomsHomeReponse[]> {
    const observable = new Observable<IRoomsHomeReponse[]>(observer => {
      this.socket.on(sockets.messages.response, (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

}
