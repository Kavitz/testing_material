import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective, FormControl, Validators } from '@angular/forms';
import { DialogsService } from '../dialogs/dialogs.service';
import { APIService } from '../../services/apiservice.service';
import { UtilService } from '../../services/utils.service';
import { APIConstants } from '../../services/constants';
import { ManageUsers, ManageGroups } from '../../model/v1830.model';
import { Observable, timer } from 'rxjs';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
	selector: 'v1830-managegroups',
	templateUrl: './managegroups.component.html',
	styleUrls: ['./managegroups.component.css'],
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
export class ManagegroupsComponent implements OnInit {
	username: any;
	elements: any;
	pagetitle = 'Manage Groups';
	refreshbtn: boolean = true;
	addbtn: boolean = true;
	searchbtn: boolean = true;
	hidepassword = true;
	managegroupsform: FormGroup;
	errormessage: string = '';
	private groupDetails: any = { groupname: '', created_By: '' };
	managegroups$: Observable<Array<ManageGroups>>;
	submitbuttonaction: string;
	clearbuttonaction: string;
	hidevalidationerror: boolean = true;
	showform = false;
	manageuserform: FormGroup;
	@ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
	columns: { columnDef: string; header: string; width: string, dispcolumn: boolean; cell: (element: any) => string; }[] = [
		{ columnDef: 'groupname', header: 'Group', width: '3%', dispcolumn: false, cell: (element: any) => `${element.groupname}` },
		{ columnDef: 'created_By', header: 'Created By', width: '3%', dispcolumn: false, cell: (element: any) => `${element.created_By}` }
	];

	constructor(private dialogs: DialogsService, private service: APIService, private utilsservice: UtilService) {
		const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
		this.username = currentUser.username;
		this.createForm();
		this.submitbuttonaction = 'Add';
		this.clearbuttonaction = 'Clear';
	}

	ngOnInit() {
		this.managegroups$ = this.service.getAPI(APIConstants.GET_GROUP_DETAILS);

	}

	createForm() {
		this.managegroupsform = new FormGroup({
			groupname: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z_ |-][A-Za-z0-9_ |-]*$')]),
			created_By: new FormControl('', Validators.required)

		});
		this.managegroupsform.controls['created_By'].setValue(this.username);
	}

	onAddClick() {
		this.showform = true;
		this.submitbuttonaction = 'Add';
		this.clearbuttonaction = 'Clear';
		this.managegroupsform.controls['created_By'].disable();
		// this.clearFormGroupDirective('Clear');
	}

	refreshClick() {
		this.managegroups$ = this.service.getAPI(APIConstants.GET_GROUP_DETAILS);
	}

	onEditClick(row) {
		this.submitbuttonaction = 'Update';
		this.clearbuttonaction = 'Reset';
		if (this.username == row.created_By) {
			this.showform = true;
			this.managegroupsform.controls['created_By'].disable();
			this.managegroupsform.controls['groupname'].disable();
			this.managegroupsform.controls['created_By'].setValue(row.created_By);
			this.managegroupsform.controls['groupname'].setValue(row.groupname);
		} else {
			this.dialogs.infoConfirm('Permission Denied!', 'Could not edit the group created by another admin.', 'OK', 'info').subscribe((manage) => {
			});
		}
	}

	closeFormGroupDirective() {
		this.formGroupDirective.resetForm();
		this.hidevalidationerror = true;
		this.showform = false;
		this.managegroupsform.controls['created_By'].setValue(this.username);
	}

	clearFormGroupDirective(clearorreset) {
		this.hidevalidationerror = true;
		if (clearorreset == 'Clear') {
			this.formGroupDirective.resetForm();
		} else {
			// this.setFormValues();
		}
	}

	doAction() {
		if (this.managegroupsform.invalid) {
			this.hidevalidationerror = false;
			this.errormessage = 'Please fill out valid data!';
		} else {
			if (this.submitbuttonaction == 'Add') {
				this.groupDetails = { groupname: this.managegroupsform.getRawValue().groupname, created_By: this.managegroupsform.getRawValue().created_By };
				this.service.postAPI(APIConstants.GET_GROUP_DETAILS, this.groupDetails)
					.subscribe((addresult) => {
						if (addresult.code == 'ER_DUP_ENTRY') {
							if (addresult.sqlMessage.indexOf('PRIMARY') != -1) {
								this.hidevalidationerror = false;
								this.errormessage = 'User Name is already available, Name must unique for each entry.';
							}
						} else {
							this.clearFormGroupDirective('Clear');
							this.refreshClick();
							this.managegroupsform.controls['created_By'].setValue(this.username);
						}
					}, (err) => {
						if (err.status == '400') {
							this.hidevalidationerror = false;
							if (err._body.indexOf('ER_DUP_ENTRY') != -1) {
								this.hidevalidationerror = false;
								this.errormessage = 'Group Name is already available, Name must unique for each entry.';
							} else {
								this.errormessage = 'Add Failed, Please try again';
							}
						}
					});
			} else if (this.submitbuttonaction == 'Update') {
				this.service.editAPI(APIConstants.ADD_GROUP_DETAILS, this.managegroupsform.getRawValue().groupname, this.managegroupsform.value)
					.subscribe((editresult) => {
						this.refreshClick();
					});
			}
		}

	}

	onDelete(row) {
		if (this.username == row.created_By) {
			this.dialogs.confirm('Delete user details', 'Are you sure you want to delete ' + row.groupname + ' ?', 'Delete').subscribe((manage) => {
				if (manage) {
					this.service.deleteAPI(APIConstants.GET_GROUP_DETAILS, row.groupname)
						.subscribe((logmsg) => {
							if (logmsg.affectedRows == 1) {
								this.service.getAPI(APIConstants.GETADMINPREFERENCE).subscribe((data) => {
									const usergroup = data.usergroup;
									if (row.groupname == usergroup) {
										this.service.editAPI(APIConstants.ADDADMINPREFERENCE, '1', { usergroup: 'None', userrole: data.userrole, defaultrunlevel: data.defaultrunlevel, simmasterserver: data.simmasterserver, simuiserver: data.simuiserver, message: data.message }).subscribe((result) => {
										});
									}
								});
								this.refreshClick();
								if (this.submitbuttonaction == 'Update') {
									this.closeFormGroupDirective();
								}
							}
						}, (err) => {
							this.utilsservice.log2('server failure in deleting user details(err.status)', err.status);
						});
				}
			});
		} else {
			this.dialogs.infoConfirm('Permission Denied!', 'Could not delete the group created by another admin.', 'OK', 'info').subscribe((manage) => {
			});
		}
	}
}
