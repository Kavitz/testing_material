import { Component, OnInit } from '@angular/core';
import { APIService } from '../../services/apiservice.service';
import { APIConstants } from '../../services/constants';
import { Observable } from 'rxjs/internal/Observable';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UtilService } from '../../services/utils.service';
import { DataserviceService } from '../../services/dataservice.service';
import { SpinnerService } from '../spinner/spinner.service';
export interface Userrole {
	value: string;
	viewValue: string;
}
@Component({
	selector: 'v1830-userpreference',
	templateUrl: './adminpreference.component.html',
	styleUrls: ['./adminpreference.component.css']
})
export class AdminpreferenceComponent implements OnInit {
	admindataarray: any;
	refreshbtn = false;
	addbtn = false;
	searchbtn = false;
	pagetitle = 'Admin Preference';
	username: any;
	registerStatus: boolean;
	defaultDetails: { usergroup: any; userrole: string; defaultrunlevel: string, simmasterserver: string, simuiserver: string, message: string, v1830: string, simbuilder: string, sitespecific: string, color: string };
	statusmessage: string;
	grouplist$: Observable<string[]>;
	adminpreferenceForm: FormGroup;
	defaultuserrole = '';
	defaultusergrp = '';
	message = '';
	runlevels: Userrole[] = [
		{ value: 'stop', viewValue: 'STOP' },
		{ value: 'start', viewValue: 'START' },
		{ value: 'commission', viewValue: 'COMMISSION' }
	];
	userroles: Userrole[] = [
		{ value: 'administrator', viewValue: 'ADMINISTRATOR' },
		{ value: 'observer', viewValue: 'OBSERVER' },
		{ value: 'superuser', viewValue: 'SUPERUSER' },
		{ value: 'standard', viewValue: 'STANDARD' }
	];
	colors: Object[] = [
		{ value: 'standard', viewValue: 'Standard', color: '#f9dfa6'},
		{ value: 'danger', viewValue: 'Danger' , color: '#fb000c'},
		{ value: 'warning', viewValue: 'Warning' , color: '#f9ad1f'},
	];

	constructor(private service: APIService, private utilsservice: UtilService, private data: DataserviceService, private spinner: SpinnerService) {
		this.statusmessage = '';
		this.createForm();
		const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
		if (currentUser) {
			this.username = currentUser.username;
		}
		this.grouplist$ = this.service.getAPI(APIConstants.GET_GROUP_DETAILS);
		this.getadminpreference();
	}

	ngOnInit() {
		this.data.currentMessage.subscribe(message => this.message = message);
	}

	createForm() {
		this.adminpreferenceForm = new FormGroup({
			usergroup: new FormControl('', Validators.required),
			userrole: new FormControl('', Validators.required),
			defaultrunlevel: new FormControl('', Validators.required),
			simmasterserver: new FormControl(''),
			simuiserver: new FormControl(''),
			v1830: new FormControl(''),
			simbuilder: new FormControl(''),
			sitespecific: new FormControl(''),
			color: new FormControl(''),
			message: new FormControl('', Validators.maxLength(100))
		});
	}

	getadminpreference() {
		this.service.getAPI(APIConstants.GETADMINPREFERENCE)
			.subscribe((data) => {
				this.adminpreferenceForm.controls['userrole'].setValue(data.userrole);
				this.adminpreferenceForm.controls['usergroup'].setValue(data.usergroup);
				this.adminpreferenceForm.controls['defaultrunlevel'].setValue(data.defaultrunlevel);
				this.adminpreferenceForm.controls['simmasterserver'].setValue(data.simmasterserver);
				this.adminpreferenceForm.controls['simuiserver'].setValue(data.simuiserver);
				this.adminpreferenceForm.controls['v1830'].setValue(data.v1830);
				this.adminpreferenceForm.controls['simbuilder'].setValue(data.simbuilder);
				this.adminpreferenceForm.controls['sitespecific'].setValue(data.sitespecific);
				this.adminpreferenceForm.controls['message'].setValue(data.message);
				this.adminpreferenceForm.controls['color'].setValue(data.color);
			});
	}

	onresetclick() {
		this.getadminpreference();
		this.statusmessage = '';
	}

	onsaveclick() {
		this.statusmessage = '';
		if (this.adminpreferenceForm.invalid) {
			this.statusmessage = 'Please fill out all the fields!';
		} else {
			this.spinner.confirm(true);
			this.defaultDetails = { usergroup: this.adminpreferenceForm.get('usergroup').value, userrole: this.adminpreferenceForm.get('userrole').value, defaultrunlevel: this.adminpreferenceForm.get('defaultrunlevel').value, simmasterserver: this.adminpreferenceForm.get('simmasterserver').value, simuiserver: this.adminpreferenceForm.get('simuiserver').value, message: this.adminpreferenceForm.get('message').value, v1830: this.adminpreferenceForm.get('v1830').value, simbuilder: this.adminpreferenceForm.get('simbuilder').value, sitespecific: this.adminpreferenceForm.get('sitespecific').value , color: this.adminpreferenceForm.get('color').value};
			this.service.editAPI(APIConstants.ADDADMINPREFERENCE, '1', this.defaultDetails)
				.subscribe((registerresult) => {
					this.registerStatus = true;
					if (registerresult == 'updated') {
						this.statusmessage = 'Default value set for role and group successfully';
						this.data.changeMessage(this.adminpreferenceForm.value);
						this.spinner.confirm(false);
					} else {
						this.statusmessage = 'Operation Failed, Please try again!';
						this.spinner.confirm(false);
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


