import { Injectable } from "@angular/core";
import * as io from "socket.io-client";
import { } from "rxjs/Observable";
import { Observable } from "rxjs";
import { IRoomsHomeReponse } from "../../../../../../shared/models/responses/home";
import { HomeSocketService } from "../../../services/socket/home-socket.service";

@Injectable({ providedIn: "root" })
export class HomeService {

  serverResponse: Observable<IRoomsHomeReponse[]>;

  constructor(
    private _hSocketService: HomeSocketService
  ) {
    this.serverResponse = <Observable<any>>_hSocketService.getServerResponse().map(
      (response: any): any => {
        return response;
      }
    );
  }
}

