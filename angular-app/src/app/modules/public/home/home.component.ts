import { Component, OnInit } from '@angular/core';
import { RoomUi } from '../../../models/room';
import { GameType } from '../../../../../../shared/helpers/global';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public Rooms: Array<RoomUi> = [];

  constructor() { }

  ngOnInit() {
    console.log("oninit");
    this.Rooms = [];
    this.Rooms.push(new RoomUi(GameType.BRISCOLA, "gamer.png", "bg-c-A5A4C3"));
    this.Rooms.push(new RoomUi(GameType.TRESSETTE, "knight.png", "bg-c-FFB4B1"));
    this.Rooms.push(new RoomUi(GameType.TRIS, "rocket.png", "bg-c-EDA2C0"));
  }

}
