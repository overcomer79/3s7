import { Component, OnInit, Input } from '@angular/core';
import { RoomUi } from '../../models/room';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-room',
  templateUrl: './card-room.component.html',
  styleUrls: ['./card-room.component.css']
})
export class CardRoomComponent implements OnInit {

  @Input("room") room: RoomUi;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  showRoomGame() {
    this.router.navigate(["rooms", this.room.gameType.name]);
  }

}
