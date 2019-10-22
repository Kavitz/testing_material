import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material';
import { LoginService } from '../../landing/login/login.service';
import { Router } from '@angular/router';
import { APIConstants } from 'src/app/services/constants';
import { APIService } from 'src/app/services/apiservice.service';
import { DataserviceService } from 'src/app/services/dataservice.service';
@Component({
    selector: 'v1830-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
    @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
    navbarOpen = false;
    version: string;
    userrole: string;
    adminbtn: any;
    v1830url = false;
    defaultv1830url = 'https://135.239.17.150/';
    defaultsimbuilderurl = 'https://135.239.17.150/';
    simbuilderurl = false;
    sitespecificurl = false;
    siteurl;
    constructor(private loginservice: LoginService, private router: Router, private service: APIService, private data: DataserviceService) {
        this.service.getAPI(APIConstants.RETRIEVE_VERSION).subscribe((version) => {
            this.version = version.trim();
        });
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        this.userrole = currentUser.userrole;
        this.getadminpreference();

    }

    ngOnInit() {
     this.data.currentMessage.subscribe((result) => {
            if (result != '') {
                this.v1830url = false;
                this.simbuilderurl = false;
                this.sitespecificurl = false;
                this.defaultv1830url = 'https://confluence.app.alcatel-lucent.com/display/1830AUTO/virtual1830+-+User+Guide';
                this.defaultsimbuilderurl = 'https://confluence.app.alcatel-lucent.com/display/1830AUTO/SimBuilder+User+Guide';
           if (result.v1830 != '') {
                this.v1830url = true;
                this.defaultv1830url = result.v1830;
            }
            if (result.simbuilder != '') {
                 this.simbuilderurl = true;
                this.defaultsimbuilderurl = result.simbuilder;
            }
            if (result.sitespecific != '') {
                this.sitespecificurl = true;
                 this.siteurl = result.sitespecific;
             }
            }

        });
    }

    toggleNavbar() {
        this.navbarOpen = !this.navbarOpen;
    }

    doLogout() {
        this.loginservice.logout();
        this.router.navigate(['/login']);
    }

    getadminpreference() {
        this.service.getAPI(APIConstants.GETADMINPREFERENCE).subscribe((result) => {
            if (result.v1830 != '') {
                this.v1830url = true;
                this.defaultv1830url = result.v1830;
            }
            if (result.simbuilder != '') {
                this.simbuilderurl = true;
                this.defaultsimbuilderurl = result.simbuilder;
            }
            if (result.sitespecific != '') {
                this.sitespecificurl = true;
                this.siteurl = result.sitespecific;
            }

        });
    }
}
