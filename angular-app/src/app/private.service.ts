import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class PrivateService {
  private _privateAreaUrl = "https://172.23.1.164:3000/oauth/secret";

  constructor(private http: HttpClient) {}

  getPrivateArea() {
    return this.http.get<any>(this._privateAreaUrl);
  }
}
