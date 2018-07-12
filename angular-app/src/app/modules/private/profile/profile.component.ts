import { Component, OnInit } from '@angular/core';
import { PrivateService } from '../../../services/private/private.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
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
