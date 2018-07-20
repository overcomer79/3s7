import { Component, OnInit } from '@angular/core';
import { RoomUi } from '../../../models/room';
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
    this.Rooms = this.roomsService.getRooms();
  }

}
