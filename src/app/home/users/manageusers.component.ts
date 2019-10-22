import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { DialogsService } from '../dialogs/dialogs.service';
import { APIService } from '../../services/apiservice.service';
import { UtilService } from '../../services/utils.service';
import { APIConstants } from '../../services/constants';
import { ManageUsers, ManageGroups } from '../../model/v1830.model';
import { Observable, timer, from } from 'rxjs';
import { trigger, transition, animate, style } from '@angular/animations';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
export interface Userrole {
	value: string;
	viewValue: string;
}


@Component({
	selector: 'v1830-manageusers',
	templateUrl: './manageusers.component.html',
	styleUrls: ['./manageusers.component.css'],
	animations: [
		trigger('slideInOut', [
			transition(':enter', [
				style({ transform: 'translateY(-100%)' }),
				animate('300ms ease-in-out', style({ transform: 'translateY(0%)' }))
			]),
			transition(':leave', [
				animate('300ms ease-in-out', style({ transform: 'translateY(-100%)' }))
			])
		])
	]
})


export class ManageusersComponent implements OnInit {
	elements: any;
	pagetitle = 'Manage Users';
	refreshbtn: boolean = true;
	addbtn: boolean = true;
	searchbtn: boolean = true;
	registerDetails: any = { username: '', pass: '', group: '', role: '' };
	hidepassword = true;
	manageusersform: FormGroup;
	errormessage: string = '';
	usergroupvalue: any;
	userrolevalue: any;
	manageusers$: Observable<Array<ManageUsers>>;
	currentuser: ManageUsers;
	managegroups$: Observable<Array<ManageGroups>>;
	submitbuttonaction: string;
	clearbuttonaction: string;
	hidevalidationerror: boolean = true;
	showform = false;
	manageuserform: FormGroup;
	userroles: Userrole[] = [
		{ value: 'administrator', viewValue: 'ADMINISTRATOR' },
		{ value: 'observer', viewValue: 'OBSERVER' },
		{ value: 'superuser', viewValue: 'SUPERUSER' },
		{ value: 'standard', viewValue: 'STANDARD' }
	];
	@ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
	columns: { columnDef: string; header: string; width: string; dispcolumn: boolean; cell: (element: any) => string; }[] = [
		{ columnDef: 'username', header: 'UserName', width: '3%', dispcolumn: false, cell: (element: any) => `${element.username}` },
		{ columnDef: 'role', header: 'Role', width: '2%', dispcolumn: false, cell: (element: any) => `${element.role}` },
		{ columnDef: 'groupname', header: 'Group name', width: '3%', dispcolumn: false, cell: (element: any) => `${element.groupname}` }
	];
	defaultuserrole: any;
	defaultusergrp: any;

	constructor(private dialogs: DialogsService, private service: APIService, private utilsservice: UtilService) {
		this.createForm();
		this.submitbuttonaction = 'Add';
		this.clearbuttonaction = 'Clear';
		this.service.getAPI(APIConstants.GETADMINPREFERENCE).subscribe((result) => {
			if (result != undefined && result != null) {
				this.manageusersform.controls['userrole'].setValue(result.userrole);
			}
		});
	}


	ngOnInit() {
		this.manageusers$ = this.service.getAPI(APIConstants.RETRIEVE_MANAGE_USERS);
		this.managegroups$ = this.service.getAPI(APIConstants.GET_GROUP_DETAILS);
		this.getdefaultvalues();
	}


	private createForm() {
		this.manageusersform = new FormGroup({
			username: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z_ |-][A-Za-z0-9_ |-]*$')], this.shouldBeEqual.bind(this)),
			password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z])(.{8,15})$')]),
			usergroup: new FormControl('', Validators.required),
			userrole: new FormControl('', Validators.required)
		});
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

	refreshClick() {
		this.manageusers$ = this.service.getAPI(APIConstants.RETRIEVE_MANAGE_USERS);
		this.getdefaultvalues();
	}

	getdefaultvalues() {
		this.service.getAPI(APIConstants.GETDEFAULTUSERROLE)
			.subscribe((data) => {
				this.defaultuserrole = data;
				this.manageusersform.controls['userrole'].setValue(this.defaultuserrole);
			});
		this.service.getAPI(APIConstants.GETDEFAULTUSERGROUP)
			.subscribe((data) => {
				this.defaultusergrp = data;
				this.manageusersform.controls['usergroup'].setValue(this.defaultusergrp);
			});
	}
	onAddClick() {
		this.showform = true;
		this.manageusersform.controls['username'].enable();
		this.manageusersform.controls['password'].enable();
		this.submitbuttonaction = 'Add';
		this.clearbuttonaction = 'Clear';
		this.clearFormGroupDirective('Clear');
	}

	applyFilter(filterValue: string) {
		this.elements.filter = filterValue.trim().toLowerCase();
	}

	closeFormGroupDirective() {
		this.formGroupDirective.resetForm();
		this.hidevalidationerror = true;
		this.showform = false;
		this.getdefaultvalues();
	}

	clearFormGroupDirective(clearorreset) {
		this.hidevalidationerror = true;
		if (clearorreset == 'Clear') {
			this.formGroupDirective.resetForm();
			this.manageusers$ = this.service.getAPI(APIConstants.RETRIEVE_MANAGE_USERS);
			this.getdefaultvalues();
		} else {
			this.setFormValues();
		}
	}
	onEditClick(row) {
		this.currentuser = Object.assign({}, row);
		this.submitbuttonaction = 'Update';
		this.clearbuttonaction = 'Reset';
		this.showform = true;
		this.manageusersform.setValue({ 'username': row.username, 'password': row.password, 'usergroup': row.groupname, 'userrole': row.role });
		this.manageusersform.controls['username'].disable();
		this.manageusersform.controls['password'].disable();
		this.setFormValues();
	}

	setFormValues() {
		this.manageusersform.setValue({
			'username': this.currentuser.username, 'password': this.currentuser.password, 'usergroup': this.currentuser.groupname, 'userrole': this.currentuser.role
		});
	}

	doAction() {
		if (this.manageusersform.invalid) {
			this.hidevalidationerror = false;
			this.errormessage = 'Please fill out valid data!';
		} else {
			if (this.submitbuttonaction == 'Add') {
				this.registerDetails = { username: this.manageusersform.value.username, password: this.manageusersform.value.password, groupname: this.manageusersform.value.usergroup, role: this.manageusersform.value.userrole };
				this.service.postAPI(APIConstants.ADDREGISTERDETAILS, this.registerDetails)
					.subscribe((addresult) => {
						if (addresult.code == 'ER_DUP_ENTRY') {
							if (addresult.sqlMessage.indexOf('PRIMARY') != -1) {
								this.hidevalidationerror = false;
								this.errormessage = 'User Name is already available, Name must unique for each entry.';
							}
						} else {
							this.clearFormGroupDirective('Clear');
							this.refreshClick();
						}
					}, (err) => {
						if (err.status == '400') {
							this.hidevalidationerror = false;
							if (err._body.indexOf('ER_DUP_ENTRY') != -1) {
								this.hidevalidationerror = false;
								this.errormessage = 'User Name is already available, Name must unique for each entry.';
							} else {
								this.errormessage = 'Add Failed, Please try again';
							}
						}
					});
			} else if (this.submitbuttonaction == 'Update') {
				this.registerDetails = { username: this.manageusersform.getRawValue().username, password: this.manageusersform.getRawValue().password, groupname: this.manageusersform.value.usergroup, role: this.manageusersform.value.userrole };
				this.service.editAPI(APIConstants.EDIT_USER_DETAILS, this.manageusersform.getRawValue().username, this.registerDetails)
					.subscribe((editresult) => {
						this.closeFormGroupDirective();
						this.refreshClick();
					});
			}
		}

	}

	onDelete(row) {
		this.dialogs.confirm('Delete user details', 'Are you sure you want to delete ' + row.username + ' ?', 'Delete').subscribe((manage) => {
			if (manage) {
				this.service.deleteAPI(APIConstants.RETRIEVE_MANAGE_USERS, row.username)
					.subscribe((logmsg) => {
						if (logmsg.affectedRows == 1) {
							this.refreshClick();
						}
						if (this.submitbuttonaction == 'Update') {
							this.closeFormGroupDirective();
						}
					}, (err) => {
						this.utilsservice.log2('server failure in deleting user details(err.status)', err.status);
					});
			}
		});
	}

}
