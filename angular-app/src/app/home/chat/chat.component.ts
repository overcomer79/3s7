import { Component, OnInit } from "@angular/core";
import { HomeService } from "../../home/home-service";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"],
  providers: []
})
export class ChatComponent implements OnInit {
  messageArray: Array<{ user: String; message: String, type: String }> = [];

  constructor(private _homeService: HomeService) {}

  ngOnInit() {
    this._homeService.newUserJoined().subscribe(data => {
      this.messageArray.push(
        {
          user: data.user,
          message: data.message,
          type: "info"
        });
      console.log(data);
    });
    /*
    this._homeService.getUserName().subscribe(data => {
      console.log(data);
    });
    */
  }
}
