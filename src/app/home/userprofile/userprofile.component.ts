import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../services/utils.service';
import { APIService } from '../../services/apiservice.service';
import { APIConstants } from '../../services/constants';

@Component({
    selector: 'v1830-userprofile',
    templateUrl: './userprofile.component.html',
    styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent {
    pagetitle = 'User Profile';
    refreshbtn = false;
    addbtn = false;
    searchbtn = false;
    username: any;
    email: any;
    usergroup: any;
    userrole: any;
    constructor(private userservice: APIService, private utilsservice: UtilService) {
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        this.username = currentUser.username;
        this.userservice.getUserProfile(APIConstants.RETRIEVE_USERPROFILE, currentUser.username)
            .subscribe((users) => {
                this.email = '-';
                this.userrole = users[0].role;
                this.usergroup = users[0].groupname;
            }, (err) => {
                console.log(err.status);
                this.utilsservice.authenticationFailed(err.status);
            });
    }

    refreshClick() {
        return;
    }

    onAddClick() {
        return;
    }
}
