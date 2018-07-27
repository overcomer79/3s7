import { Component, OnInit } from "@angular/core";
// import { LocalAuthService } from "../services/security/auth.service";
import { Router } from "@angular/router";
import { LocalAuthService } from "../../../services/security/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  registerUserData = { email: "", password: "" };

  /*
  name: String;
  username: String;
  email: String;
  password: String;
  */
  constructor(private _auth: LocalAuthService, private _router: Router) {}

  ngOnInit() {}

  registerUser() {
    // console.log(this.registerUserData);
    this._auth.registerUser(this.registerUserData).subscribe(
      res => {
        // console.log(res);
        localStorage.setItem("token", res.token);
        this._router.navigate(["/"]);
      },
      err => console.log(err)
    );
  }
}
