import { Component, OnInit, ViewChild } from '@angular/core';
import { APIService } from '../../services/apiservice.service';
import { APIConstants } from '../../services/constants';
import { FormGroup, FormControl, Validators, NgForm, FormGroupDirective, AbstractControl, ValidationErrors } from '@angular/forms';
import { UtilService } from '../../services/utils.service';
import { DialogsService } from '../dialogs/dialogs.service';
import { trigger, transition, animate, style } from '@angular/animations';
import { Vcenter } from '../../model/v1830.model';
import { Observable, timer } from 'rxjs';
import { SpinnerService } from '../spinner/spinner.service';
@Component({
	selector: 'v1830-vcenter',
	templateUrl: './vcenter.component.html',
	styleUrls: ['./vcenter.component.css'],
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

export class VcenterComponent implements OnInit {
	pagetitle = 'Manage vCenters';
	refreshbtn: boolean = true;
	addbtn: boolean = true;
	searchbtn: boolean = true;
	hidepassword = true;
	submitbuttonaction: string;
	clearbuttonaction: string;
	showform = false;
	vcenterform: FormGroup;
	vcenters$: Observable<Array<Vcenter>>;
	currentvc: Vcenter;
	hidevalidationerror: boolean = true;
	errormessage: string = '';
	@ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
	columns: { columnDef: string; header: string; width: string; dispcolumn: boolean; cell: (element: any) => string; }[] = [
		{ columnDef: 'name', header: 'Name', width: '1%', dispcolumn: false, cell: (element: any) => `${element.name}` },
		{ columnDef: 'ipaddress', header: 'IP Address/Host Name', width: '2%', dispcolumn: false, cell: (element: any) => `${element.ipaddress}` },
		{ columnDef: 'username', header: 'UserName', width: '1%', dispcolumn: false, cell: (element: any) => `${element.username}` },
		{ columnDef: 'password', header: 'Password', width: '1%', dispcolumn: true, cell: (element: any) => `${element.password}` }
	];

	constructor(private dialogs: DialogsService, private service: APIService, private utilsservice: UtilService, private spinner: SpinnerService) {
		this.submitbuttonaction = 'Add';
		this.clearbuttonaction = 'Clear';
		this.createForm();
	}

	ngOnInit() {
		this.vcenters$ = this.service.getAPI(APIConstants.RETRIEVE_VCENTER);
	}

	createForm() {
		this.vcenterform = new FormGroup({
			name:  new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z_ |-][A-Za-z0-9_ |-]*$')]),
			ipaddress: new FormControl('', Validators.required),
			username: new FormControl('', Validators.required),
			password: new FormControl('', Validators.required)
		});
	}

	// shouldBeUnique(control: AbstractControl): Observable<ValidationErrors | null> {
	// 	const timer = timer(2000, 1000);
	//     return Observable
	//         .timer(50)
	//         .debounceTime(50)
	//         .distinctUntilChanged()
	//         .switchMap(() => {
	//             return this.service.checkExistingAPI(APIConstants.CHECK_VC_EXIST,control.value);
	//         })
	//         .map((res) => res.json())
	//         .map((res) => res ? { shouldBeUnique: true } : null);
	// }

	refreshClick() {
		this.vcenters$ = this.service.getAPI(APIConstants.RETRIEVE_VCENTER);
	}

	onAddClick() {
		this.showform = true;
		this.submitbuttonaction = 'Add';
		this.clearbuttonaction = 'Clear';
		this.errormessage = '';
		this.vcenterform.controls['name'].enable();
		this.clearFormGroupDirective('Clear');
	}

	closeFormGroupDirective() {
		this.formGroupDirective.resetForm();
		this.hidevalidationerror = true;
		this.showform = false;
	}

	clearFormGroupDirective(clearorreset) {
		this.hidevalidationerror = true;
		if (clearorreset == 'Clear') {
			this.formGroupDirective.resetForm();
		} else {
			this.setFormValues();
		}
	}

	onEditClick(row) {
		this.currentvc = Object.assign({}, row);
		this.submitbuttonaction = 'Update';
		this.clearbuttonaction = 'Reset';
		this.showform = true;
		this.vcenterform.controls['name'].disable();
		this.setFormValues();
	}

	setFormValues() {
		this.vcenterform.setValue({
			'name': this.currentvc.name, 'ipaddress': this.currentvc.ipaddress, 'username': this.currentvc.username, 'password': this.currentvc.password
		});
	}

	onDelete(row) {
		this.service.select2API(APIConstants.RESOURCE_URL_OVF, 'vcenter', row.name)
			.subscribe((vcenterlength) => {
				if (vcenterlength == 0) {
					this.dialogs.confirm('Delete vCenter', 'Are you sure you want to delete ' + row.name + ' ?', 'Delete').subscribe((res) => {
						if (res) {
							this.spinner.confirm(true);
							this.service.deleteAPI(APIConstants.RETRIEVE_VCENTER, row.name)
								.subscribe((logmsg) => {
									if (logmsg.affectedRows === 1) {
										this.refreshClick();
										this.spinner.confirm(false);
									}
									if (this.submitbuttonaction == 'Update') {
										this.closeFormGroupDirective();
									}
								}, (err) => {
									this.utilsservice.log2('server failure in deleting vcenter(err.status)', err.status);
									this.spinner.confirm(false);
								});
						} else {
							this.spinner.confirm(false);
						}
					});
				} else {
					this.dialogs.infoConfirm('Permission Denied!', 'Could not delete the vCenter involved in resource configuration.', 'OK', 'info').subscribe((manage) => {
					});
				}
			});
	}

	doAction() {
		if (this.vcenterform.invalid) {
			this.hidevalidationerror = false;
			this.errormessage = 'Please fill out valid data!';
		} else {

			this.service.postAPI(APIConstants.CHECK_VC_STATE, this.vcenterform.value)
				.subscribe((result) => {
					if (result == 'ok') {
						if (this.submitbuttonaction == 'Add') {
							this.spinner.confirm(true);
							this.service.postAPI(APIConstants.RETRIEVE_VCENTER, this.vcenterform.value)
								.subscribe((addresult) => {
									if (addresult.code == 'ER_DUP_ENTRY') {
										if (addresult.sqlMessage.indexOf('PRIMARY') != -1) {
											this.hidevalidationerror = false;
											this.errormessage = 'vCenter Name is already available, Name must unique for each entry.';
											this.spinner.confirm(false);
										}
									} else {
										this.clearFormGroupDirective('Clear');
										this.refreshClick();
										this.spinner.confirm(false);
									}
								}, (err) => {
									if (err.status == '400') {
										this.hidevalidationerror = false;
										if (err._body.indexOf('ER_DUP_ENTRY') != -1) {
											this.hidevalidationerror = false;
											this.errormessage = 'vCenter Name is already available, Name must unique for each entry.';
										} else {
											this.errormessage = 'Add Failed, Please try again';
										}
										this.spinner.confirm(false);
									}
								});
						} else if (this.submitbuttonaction == 'Update') {
							this.spinner.confirm(true);
							this.service.editAPI(APIConstants.RETRIEVE_VCENTER, this.vcenterform.get('name').value, this.vcenterform.value)
								.subscribe((editresult) => {
									this.closeFormGroupDirective();
									this.refreshClick();
									this.spinner.confirm(false);
								});
						}
					} else {
						this.hidevalidationerror = false;
						if (result == 'incorrect user name or password') {
							this.errormessage = 'vCenter Username or Password is incorrect, Authentication failed';
							this.spinner.confirm(false);
						} else {
							this.errormessage = 'Failed, Not able to reach the vCenter!';
							this.spinner.confirm(false);
						}
					}
				});
		}
	}
}

