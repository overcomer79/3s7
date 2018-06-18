import { Component, OnInit } from "@angular/core";
import { HomeService } from "../home-service";

@Component({
  selector: "app-utenti-connessi-badge",
  templateUrl: "./utenti-connessi-badge.component.html",
  styleUrls: ["./utenti-connessi-badge.component.css"],
  providers: []
})
export class UtentiConnessiBadgeComponent implements OnInit {
  utentiConnessi = 0;
  myUserName: String = "";

  constructor(private _homeService: HomeService) {}

  ngOnInit() {
    this._homeService
      .newUserConnected()
      .subscribe(data => (this.utentiConnessi = data));

    this._homeService
      .getUserName()
      .subscribe(data => (this.myUserName = data));

  }
}
