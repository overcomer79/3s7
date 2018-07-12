import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { WebsocketService } from "../../services/socket/websocket.service";

@Injectable({
  providedIn: "root"
})
export class UtentiConnessiBadgeService {
  usersInfo: Observable<any>;
  connectedUser: Observable<any>;

  constructor(private _wsService: WebsocketService) {
    this.usersInfo = <Observable<any>>_wsService.connectedUsersInfo().map(
      (response: any): any => {
        return response;
      }
    );

    this.connectedUser = <Observable<any>>_wsService.connectedUser().map(
      (response: any): any => {
        return response;
      }
    );

  }
}
