import { Component, OnInit } from '@angular/core';
import { APIService } from '../../services/apiservice.service';
import { APIConstants } from '../../services/constants';
import { DataserviceService } from '../../services/dataservice.service';

@Component({
  selector: 'v1830-header',
  template: `<header class="main-header clearfix">
  <h1 class="header-logo nomar pull-left">
      <img src="../../../assets/img/nokia-logo-white-2x.png">
  </h1>
  <h3 class="header-caption nomar pull-left whitec">Virtual 1830 - Master UI</h3>
  <span *ngIf="color == 'standard'" class="headermsg standard" >{{message}}</span>
  <span *ngIf="color == 'danger'" class="headermsg danger" >{{message}}</span>
  <span *ngIf="color == 'warning'" class="headermsg warning" >{{message}}</span>
  </header>`,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  message;
  color = 'standard';
  constructor(private service: APIService, private data: DataserviceService) {
    this.message = '';
    this.service.getAPI(APIConstants.GETADMINPREFERENCE).subscribe((res) => {
      this.message = res.message;
      this.color = res.color;
    });
  }

  ngOnInit() {
    this.data.currentMessage.subscribe((message) => {
      this.message = message.message;
      this.color = message.color;

    });
  }

}
