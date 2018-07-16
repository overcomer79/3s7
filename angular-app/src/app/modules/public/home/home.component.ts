import { Component, OnInit } from '@angular/core';
import { RoomUi } from '../../../models/room';
import { GameType } from '../../../../../../shared/helpers/global';
import { RoomsService } from '../../../services/rooms/rooms.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public Rooms: Array<RoomUi> = [];

  constructor(private roomsService: RoomsService) { }

  ngOnInit() {
    console.log("oninit");
    // this.Rooms = [];
    // this.Rooms.push(new RoomUi(GameType.BRISCOLA, "gamer.png", "bg-c-A5A4C3", "/games/"));
    // this.Rooms.push(new RoomUi(GameType.TRESSETTE, "knight.png", "bg-c-FFB4B1", "/games/"));
    // this.Rooms.push(new RoomUi(GameType.TRIS, "rocket.png", "bg-c-EDA2C0", "/games/tris"));
    this.Rooms = this.roomsService.getRooms();
  }

}
