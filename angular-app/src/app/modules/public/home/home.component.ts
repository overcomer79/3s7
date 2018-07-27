import { Component, OnInit } from '@angular/core';
import { RoomUi } from '../../../models/room';
import { RoomsService } from '../../../services/rooms/rooms.service';
import { HomeService } from './home-service';
import { HomeResponse } from '../../../../../../shared/models/responses/home';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public Rooms: Array<RoomUi> = [];
  
  response = {};

  constructor(private roomsService: RoomsService, private _homeService: HomeService) { }

  ngOnInit() {
    this.Rooms = this.roomsService.getRooms();
    console.log("ECCHIME");
    this._homeService.serverResponse.subscribe((data) =>{
        console.log("SERVER RESPONSE", data);
    });
  }

}
