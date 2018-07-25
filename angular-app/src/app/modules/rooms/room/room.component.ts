import { Component, OnInit } from "@angular/core";
import { RoomUi } from "../../../models/room";
import { ActivatedRoute, Router } from "@angular/router";
import { RoomsService } from "../../../services/rooms/rooms.service";
import { ChatService } from "../../../components/chat/chat.service";

@Component({
  selector: "app-room",
  templateUrl: "./room.component.html",
  styleUrls: ["./room.component.css"]
})
export class RoomComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private roomService: RoomsService,
    private router: Router,
    private _chatService: ChatService
  ) {}

  public room: RoomUi;

  ngOnInit() {
    /*
    this._chatService.messages.subscribe;
    this.route.paramMap.subscribe(p => {
      this.room = this.roomService.getRoomByType(+p.get("id"));
      if (!this.room) {
        this.router.navigate([""]);
      }
      //console.log(this.room);
    });
    */
  }
}
