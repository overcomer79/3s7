import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class PrivateService {
  private _privateAreaUrl = "https://localhost:3000/oauth/secret";

  constructor(private http: HttpClient) {}

  getPrivateArea() {
    return this.http.get<any>(this._privateAreaUrl);
  }
}
