import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import "rxjs/add/operator/map";
import { GeneralInfoSocketService } from "../../services/socket/general-info-socket.service";

@Injectable({
  providedIn: "root"
})
export class UtentiConnessiBadgeService {
  usersInfo: Observable<any>;
  connectedUser: Observable<any>;

  constructor(private _gisService: GeneralInfoSocketService) {
    this.usersInfo = <Observable<any>>_gisService.connectedUsersInfo().map(
      (response: any): any => {
        return response;
      }
    );

    this.connectedUser = <Observable<any>>_gisService.connectedUser().map(
      (response: any): any => {
        return response;
      }
    );
  }
}
