import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { MatBottomSheetRef, MatBottomSheet } from '@angular/material';
import { Observable, timer } from 'rxjs';
import { APIService } from '../../services/apiservice.service';
import { APIConstants } from '../../services/constants';
import { SpinnerService } from '../../home/spinner/spinner.service';
import 'rxjs/add/observable/timer';
import { UtilService } from 'src/app/services/utils.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { compareValidator } from '../../home/changepassword/passwordcheck.directive';

@Component({
	selector: 'v1830-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
	version: string = '0.0.0-0000';
	loginform: FormGroup;
	hide = true;
	errortext = '';
	constructor(private router: Router, private login: LoginService, private bottomSheet: MatBottomSheet, private service: APIService, private utilservice: UtilService, private spinner: SpinnerService) {
		this.service.getAPI(APIConstants.RETRIEVE_VERSION).subscribe((version) => {
			this.version = version;
			utilservice.setversion(version);
		});
	}

	ngOnInit(): void {
		this.createForm();
	}

	createForm() {
		this.loginform = new FormGroup({
			username: new FormControl('', [Validators.required]),
			password: new FormControl('', [Validators.required])
		});
	}

	get username() {
		return this.loginform.get('username');
	}

	get password() {
		return this.loginform.get('password');
	}

	doLogin() {
		this.spinner.confirm(true);
		this.login.login(this.loginform.value).subscribe((result) => {
			this.errortext = '';
			this.login.getUserRole(this.loginform.value).subscribe((role) => {
				sessionStorage.setItem('currentUser', JSON.stringify({ username: this.loginform.get('username').value, token: result.token, userrole: role }));
				this.spinner.confirm(false);
				if (role == 'observer') {
					this.router.navigate(['/default']);
				} else {
					this.router.navigate(['/home']);
					this.service.getShelfData();
				}
			});
		}, (err) => {
			this.loginform.reset();
			this.spinner.confirm(false);
			if (err.status == '404') {
				this.errortext = 'Invalid Username.';
			} else if (err.status == '401') {
				this.errortext = 'Invalid password.';
			} else {
				this.errortext = 'Server down, please contact administrator.';
			}
		});
	}
	openBottomSheet(): void {
		this.bottomSheet.open(BottomSheetOverviewExampleSheet, { disableClose: true });
	}

}
@Component({
	selector: 'v1830-bottom-sheet-overview-example-sheet',
	templateUrl: 'bottom-sheet-register.html'
})
// tslint:disable-next-line:component-class-suffix
export class BottomSheetOverviewExampleSheet implements OnInit {
	rForm: FormGroup;
	registerStatus: boolean = false;
	statusmessage: string = '';
	registerDetails: any = { username: '', pass: '', group: '' };
	grouplist$: Observable<string[]>;
	defaultuserrole: any;
	defaultusergrp: any;
	constructor(private router: Router, private login: LoginService, private bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>, private fb: FormBuilder, private service: APIService) {
		this.grouplist$ = this.service.getAPI(APIConstants.RETRIEVE_GROUP_NAME_LIST);
		this.constructForm();
	}
	ngOnInit() {

	}
	constructForm() {
		this.rForm = this.fb.group({
			username: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9-_]+$')], this.shouldBeEqual.bind(this)],
			password: [null, [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z])(.{8,15})$')]],
			confirmpassword: [null, [Validators.required, compareValidator('password')]],
			usergroup: ['None']
		});
		this.getdefaultvalues();
	}
	get username() {
		return this.rForm.get('username');
	}
	get password() {
		return this.rForm.get('password');
	}
	get confirmpassword() {
		return this.rForm.get('confirmpassword');
	}
	get usergroup() {
		return this.rForm.get('usergroup');
	}
	openLink(event: MouseEvent): void {
		this.bottomSheetRef.dismiss();
		event.preventDefault();
	}
	closeFormGroupDirective() {
		this.bottomSheetRef.dismiss();
	}

	shouldBeEqual(control: AbstractControl): Observable<ValidationErrors | null> {
		return Observable
			.timer(500)
			.pipe(debounceTime(1000))
			.pipe(distinctUntilChanged())
			.switchMap(() => {
				return this.service.checkUsername(APIConstants.CHECKUSERNAME, control.value);
			})
			.map((res) => res.json())
			.map((res) => res ? { shouldBeEqual: true } : null);
	}

	getdefaultvalues() {

		this.login.getAdminPreference(APIConstants.GETADMINPREFERENCE).subscribe((data) => {
			this.defaultuserrole = data.userrole;
			this.defaultusergrp = data.usergroup;
			this.rForm.controls['userrole'].setValue(data.userrole);
			this.rForm.controls['usergroup'].setValue(data.usergroup);
		});
	}

	registerFormGroupDirective() {
		if (this.rForm.invalid) {
			this.statusmessage = 'Please fill out all the fields!';
		} else {
			this.registerDetails = { username: this.rForm.value.username, password: this.rForm.value.password, groupname: this.rForm.value.usergroup, role: this.defaultuserrole };
			this.service.postAPI(APIConstants.ADDREGISTERDETAILS, this.registerDetails)
				.subscribe((registerresult) => {
					this.rForm.reset();
					this.registerStatus = true;
					if (registerresult == 'failed') {
						this.statusmessage = 'Registration Failed, Please try again!';
					} else if (registerresult == 'userexist') {
						this.statusmessage = 'Username already exist, Please try again!';
					} else {
						this.statusmessage = 'Registration success, please contact administrator for access!';
						// setTimeout(() => { this.bottomSheetRef.dismiss(); }, 2000);
					}
				});
		}
	}

}
