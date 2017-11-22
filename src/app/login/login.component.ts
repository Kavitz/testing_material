import {  Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';

@Component({
    selector: 'hdd-login',
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.css']
})



export class LoginVerticalComponent {

    private hddusername: string;
    private hddpassword: string;
    private showValidLogin: boolean = false;
    
    constructor(private router: Router) { }

    checkUser() {
        if(this.hddusername == 'admin' && this.hddpassword == 'admin') {
            this.router.navigateByUrl('/dashboard');
        } else {
            this.showValidLogin = true;
        }
    }

}

