import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'hdd-banner',
  templateUrl: 'banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  @Input() title: string;

  ngOnInit(): void {
      console.log(this.title);
  }
}
