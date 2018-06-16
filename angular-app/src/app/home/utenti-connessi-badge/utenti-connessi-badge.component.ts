import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home-service'

@Component({
  selector: 'app-utenti-connessi-badge',
  templateUrl: './utenti-connessi-badge.component.html',
  styleUrls: ['./utenti-connessi-badge.component.css'],
  providers:[HomeService]
})
export class UtentiConnessiBadgeComponent implements OnInit {

  utentiConnessi: number = 0;

  constructor(private _homeService:HomeService) { }

  ngOnInit() {
    this._homeService.newUserConnected()
        .subscribe(data => this.utentiConnessi = data);
  }

}
