import { Component, OnInit } from "@angular/core";
import { LocalAuthService } from "../../services/security/auth.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  constructor(public _authService: LocalAuthService) {}

  ngOnInit() {}
}