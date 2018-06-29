import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class LocalAuthService {
  private _registerUrl = "https://172.23.1.164:3000/oauth/signup";
  private _loginUrl = "https://172.23.1.164:3000/oauth/signin";
  private _googleUrl = "https://172.23.1.164:3000/oauth/google";
  private _fbUrl = "https://172.23.1.164:3000/oauth/facebook";

  constructor(private http: HttpClient, private _router: Router) {}

  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user);
  }

  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user);
  }

  googleSign(user) {
    return this.http.post<any>(this._googleUrl, {
      access_token: user.authToken
    });
  }

  fbSign(user) {
    return this.http.post<any>(this._fbUrl, {
      access_token: user.authToken
    });
  }

  logoutUser() {
    localStorage.removeItem("token");
    this._router.navigate(["/"]);
  }

  loggedIn() {
    return !!localStorage.getItem("token");
  }

  getToken() {
    return localStorage.getItem("token");
  }
}
