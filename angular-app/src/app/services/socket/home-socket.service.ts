import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { sockets } from "../../../../../shared/config/sockets";

@Injectable({
  providedIn: 'root'
})
export class HomeSocketService {

  private socket = io(environment.ws_url + sockets.namespaces.home, {
    secure: true
  });

  constructor() { }
}
