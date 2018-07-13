import { Component, OnInit, Input } from '@angular/core';
import { RoomUi } from '../../models/room';

@Component({
  selector: 'app-card-game',
  templateUrl: './card-game.component.html',
  styleUrls: ['./card-game.component.css']
})
export class CardGameComponent implements OnInit {

  @Input("room") room: RoomUi;

  constructor() { }

  ngOnInit() {
  }

}
