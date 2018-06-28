import { Component, OnInit } from "@angular/core";
import { PrivateService } from "../private.service";

@Component({
  selector: "app-private",
  templateUrl: "./private.component.html",
  styleUrls: ["./private.component.css"]
})
export class PrivateComponent implements OnInit {
  data = {};
  constructor(private _privateService: PrivateService) {}

  ngOnInit() {
    this._privateService
      .getPrivateArea()
      .subscribe(
        res => {
          this.data = JSON.stringify(res);
        },
        err => {
          this.data = JSON.stringify(err.error);
        }
      );
  }
}
