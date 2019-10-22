import { Component, OnInit } from '@angular/core';
import { LoginService } from '../landing/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'v1830-observeruser',
  template: `<span [ngStyle]="{'position':'relative','float':'right', 'cursor':'pointer'}" (click)="doLogout()"><mat-icon [ngClass]="'add_icon_title'" aria-label="Logout">exit_to_app</mat-icon></span><div style='position:absolute;top:50%;left:40%'>Please contact administrator for access.</div>`,
  styles: []
})
export class ObserveruserComponent implements OnInit {

  constructor(private loginservice: LoginService, private router: Router) { }

  ngOnInit() {
  }

  doLogout() {
    this.loginservice.logout();
		this.router.navigate(['/login']);
  }

}
