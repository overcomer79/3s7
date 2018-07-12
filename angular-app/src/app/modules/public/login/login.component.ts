import { Component, OnInit } from "@angular/core";
import { LocalAuthService } from "../../../services/security/auth.service";
import { SocialUser } from "angularx-social-login";
import { AuthService } from "angularx-social-login";
import {
  FacebookLoginProvider,
  GoogleLoginProvider
} from "angularx-social-login";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginUserData = { email: "", password: "" };

  private user: SocialUser;

  constructor(
    private _localAuth: LocalAuthService,
    private _router: Router,
    private _auth: AuthService
  ) {}

  ngOnInit() {
    this._auth.authState.subscribe(user => {
      this.user = user;
    });
  }

  loginUser() {
    this._localAuth.loginUser(this.loginUserData).subscribe(
      res => {
        localStorage.setItem("token", res.token);
        this._router.navigate(["/"]);
      },
      err => console.log(err)
    );
  }

  signInWithGoogle(): void {
    this._auth.signIn(GoogleLoginProvider.PROVIDER_ID).then(() => {
      this._localAuth.googleSign(this.user).subscribe(
        res => {
          localStorage.setItem("token", res.token);
          this._router.navigate(["/"]);
        },
        err => console.log(err)
      );
    });
  }

  signInWithFB(): void {
    this._auth.signIn(FacebookLoginProvider.PROVIDER_ID).then(() => {
      this._localAuth.fbSign(this.user).subscribe(
        res => {
          localStorage.setItem("token", res.token);
          this._router.navigate(["/"]);
        },
        err => console.log(err)
      );
    });
  }

  signOut(): void {
    this._auth.signOut();
  }
}
