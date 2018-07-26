import { Component, OnInit } from "@angular/core";
import { UtentiConnessiBadgeService } from "./utenti-connessi-badge.service";

@Component({
  selector: "app-utenti-connessi-badge",
  templateUrl: "./utenti-connessi-badge.component.html",
  styleUrls: ["./utenti-connessi-badge.component.css"],
  providers: []
})
export class UtentiConnessiBadgeComponent implements OnInit {
  utentiConnessi = 0;
  myUserName = "";

  constructor(private _utentiConnessiSrv: UtentiConnessiBadgeService) {}

  ngOnInit() {
    this._utentiConnessiSrv.usersInfo.subscribe(data => {
      this.utentiConnessi = data.numberOfUser;
    });
    this._utentiConnessiSrv.connectedUser.subscribe(data => {
      this.myUserName = data;
    });
  }
}
