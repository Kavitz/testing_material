import { Component, OnInit } from '@angular/core';
import { APIService } from '../../services/apiservice.service';
import { UtilService } from '../../services/utils.service';
import { APIConstants } from '../../services/constants';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl, FormBuilder, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
// tslint:disable-next-line:import-blacklist
import { Observable, Subscription } from 'rxjs/Rx';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import 'rxjs/add/observable/interval';
import { compareValidator, compareValidatorA } from './passwordcheck.directive';

@Component({
    selector: 'v1830-changepassword',
    templateUrl: './changepassword.component.html',
    styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
    passwordform: FormGroup;
    pagetitle = 'Change Password';
    resetDetails: any = { username: '', password: '' };
    username: any;
    resetStatus: boolean = false;
    statusmessage: string = '';
    refreshbtn = false;
	addbtn = false;
	searchbtn = false;
    hideOld: boolean = true;
    hideNew: boolean = true;
    hideConf: boolean = true;
    constructor(private userservice: APIService, private router: Router, private fb: FormBuilder, private utilsservice: UtilService) {
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        this.username = currentUser.username;
        this.userservice.getUserProfile(APIConstants.RETRIEVE_USERPROFILE, currentUser.username)
            .subscribe((users) => {
            }, (err) => {
                this.utilsservice.authenticationFailed(err.status);
            });
        this.createForm();
    }

    ngOnInit() {
        this.passwordform.controls['username'].setValue(this.username);
        this.passwordform.controls['username'].disable();
    }

    private createForm() {
        this.passwordform = this.fb.group({
            username: [null],
            oldpass: [null, [Validators.required], this.shouldBeEqual.bind(this)],
            newpass: [null, Validators.compose([Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z])(.{8,25})$'), compareValidatorA('oldpass')])],
            confirmpass: [null, [Validators.required, compareValidator('newpass')]]
        }
        );
    }
    onResetCancel() {
        this.passwordform.reset();
    }

    get oldpass() {
        return this.passwordform.get('oldpass');
    }

    get newpass() {
        return this.passwordform.get('newpass');
    }

    get confirmpass() {
        return this.passwordform.get('confirmpass');
    }

    shouldBeEqual(control: AbstractControl): Observable<ValidationErrors | null> {
        return Observable
            .timer(1000)
            .pipe(debounceTime(1000))
            .pipe(distinctUntilChanged())
            .switchMap(() => {
                return this.userservice.checkPassword(APIConstants.CHECKPASSWORD, control.value, this.passwordform.get('username').value);
            })
            .map((res) => res.json())
            .map((res) => !res ? { shouldBeEqual: true } : null);
    }

    checkOldPasswords(oldkey: string, newkey: string) {
        return (group: FormGroup) => {
            const passwordInput = group.controls[oldkey],
                passwordConfirmationInput = group.controls[newkey];
            if (passwordInput.value == passwordConfirmationInput.value) {
                return passwordConfirmationInput.setErrors({ notsame: true });
            } else {
                return passwordConfirmationInput.setErrors(null);
            }
        };
    }

    onResetSubmit() {
        if (this.passwordform.invalid) {
            this.resetStatus = true;
            this.statusmessage = 'Please fill out all the fields!';
        } else {
            this.resetDetails.password = this.passwordform.value.confirmpass;
            this.resetDetails = { username: this.passwordform.get('username').value, password: this.passwordform.value.confirmpass };
            this.userservice.postAPI(APIConstants.EDITPASSWORD, this.resetDetails)
                .subscribe((resetresult) => {
                    this.passwordform.reset();
                    this.resetStatus = true;
                    if (resetresult == 'updated') {
                        this.statusmessage = 'Password has been updated, Redirecting to login page!';
                        setTimeout(() => { this.router.navigate(['/login']); }, 2000);
                    } else {
                        this.statusmessage = 'Password Reset Failed, Please try again!';
                    }
                });
        }

    }
    onAddClick() {
		return;
	}

	refreshClick() {
		return;
	}
}

