import { Component, OnInit, Inject, Input, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { APIService } from '../../services/apiservice.service';
import { APIConstants } from '../../services/constants';
import { SelectOpion } from '../../model/v1830.model';
import { DialogsService } from '../dialogs/dialogs.service';
import { SpinnerService } from '../spinner/spinner.service';
import { UtilService } from 'src/app/services/utils.service';

@Component({
	selector: 'v1830-simpevm',
	templateUrl: './simpevm.component.html',
	styleUrls: ['./simpevm.component.css']
})
export class SimpevmComponent implements OnInit {
	userName: any;
	propertytitle: string = '';
	pagetitle = 'Simple VM Deployment';
	refreshbtn = false;
	addbtn = false;
	searchbtn = false;
	shlefmodelabel: string = 'Shelf Mode';
	loadurltitle: string = 'Configure OAR Properties';
	resourceconfiguration: string[] = [];
	shelfModeLabel: string = 'Shelf Mode';
	shelfmode: SelectOpion[];
	showmemvalidation: boolean = false;
	matrixSizeForPSS36: SelectOpion[] = this.utilservice.matrixSizeForPSS36;
	matrixSizeForPSS64: SelectOpion[] = this.utilservice.matrixSizeForPSS64;
	bootlevel: SelectOpion[] = this.utilservice.bootlevel;
	runlevel: SelectOpion[] = this.utilservice.runlevel;
	ramunit: SelectOpion[] = this.utilservice.ramunit;
	diskmodeopt: SelectOpion[] = this.utilservice.diskmodeopt;
	matrizoptions: SelectOpion[];
	displayhide: boolean = true;
	shelftyeoptions: string[] = [];
	nidetid: string = '';
	currentrcname: string = '';
	currentrcproduct: string = '';
	currentmatrixpss36: string = '';
	currentmatrixpss64: string = '';
	simplevmForm: FormGroup;
	constructor(private service: APIService, private dialogs: DialogsService, private spinner: SpinnerService, public dialogRef: MatDialog, private utilservice: UtilService) {
		const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
		this.userName = currentUser.username;
		if (currentUser) {
			this.userName = currentUser.username;
		}
		this.service.getAPI(APIConstants.RETRIEVE_RC_DEPLOY)
			.subscribe((resourceconfiguration) => {
				this.resourceconfiguration = resourceconfiguration;
			}, (err) => {
				// this.utilsservice.log2('server failure in retriving vcenter(err.status)', err.status);
				// this.utilsservice.authenticationFailed(err.status);
			});

	}

	ngOnInit() {
		this.simplevmForm = new FormGroup({
			vmname: new FormControl('', [Validators.required, Validators.pattern('^((([a-zA-Z])([a-zA-Z0-9-.])*([a-zA-Z0-9]))|(([a-zA-Z])([a-zA-Z0-9])*))$')]),
			ipaddress: new FormControl('', [Validators.required, Validators.pattern('((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))')]),
			neloadurl: new FormControl('', Validators.required),
			nebuild: new FormControl('', Validators.required),
			nodetid: new FormControl('' , Validators.pattern('^((([a-zA-Z])([a-zA-Z0-9-.])*([a-zA-Z0-9]))|(([a-zA-Z])([a-zA-Z0-9])*))$')),
			mastershelftype: new FormControl(''),
			shelfmode: new FormControl(''),
			loopbackip: new FormControl(''),
			valgrind: new FormControl(''),
			localinstall: new FormControl(''),
			keeplcec: new FormControl(false),
			bootlevel: new FormControl(''),
			runlevel: new FormControl(''),
			matrixsize: new FormControl(''),
			configuregmre: new FormControl(''),
			gmreloadurl: new FormControl(''),
			gmrebuild: new FormControl(''),
			gmrenodeip: new FormControl(''),
			gmrenotifyip: new FormControl(''),
			activategmre: new FormControl(''),
			configureoar: new FormControl(''),
			oarloadurl: new FormControl(''),
			oarbuild: new FormControl(''),
			activateoar: new FormControl(''),
			vmdiskmode: new FormControl(''),
			noofcores: new FormControl(''),
			ramsize: new FormControl(''),
			ramunit: new FormControl('')
		});
	}

	getDisbledState(val) {
		if (val == true || val == 1 || val == 'true') {
			return true;
		} else {
			return false;
		}
	}

	onAddClick() {
		return;
	}

	onRefreshClick() {
		return;
	}

	getVMProperties(resourceconfig) {
		this.spinner.confirm(true);
		this.currentrcname = resourceconfig.name.replace('.cfg', '');
		this.displayhide = false;
		this.service.selectAPI(APIConstants.RETRIEVE_RCPROPERTIES, this.currentrcname).subscribe((properties) => {
			const rcProperties = properties[0];
			this.simplevmForm.patchValue({
				neloadurl: rcProperties.neurl,
				bootlevel: rcProperties.bootlevel,
				runlevel: rcProperties.runlevel,
				gmreloadurl: rcProperties.gmreurl,
				oarloadurl: rcProperties.oarurl,
				vmdiskmode: rcProperties.nomode,
				noofcores: rcProperties.nocores,
				ramsize: rcProperties.ramsize,
				ramunit: rcProperties.ramunit,
				nodetid: this.nidetid
			});
			rcProperties.localinstall == 'True' ? this.simplevmForm.controls['localinstall'].patchValue(true) : this.simplevmForm.controls['localinstall'].patchValue(false);
			rcProperties.diskmode != undefined ? this.simplevmForm.controls['vmdiskmode'].patchValue(rcProperties.diskmode) : this.simplevmForm.controls['vmdiskmode'].patchValue('nomode');
			this.service.selectAPI(APIConstants.RETRIEVE_OVF_PRODUCT, rcProperties.ovfdefault).subscribe((product) => {
				this.currentrcproduct = product;
				this.currentmatrixpss36 = rcProperties.matrixsize_pss36;
				this.currentmatrixpss64 = rcProperties.matrixsize_pss64;
				this.shelfmode = this.utilservice.getShelfModeValue(product);
				this.shelfModeLabel = this.utilservice.getShelfModeLabel(product);
				this.simplevmForm.get('shelfmode').patchValue(rcProperties.shelfmode);
				this.shelftyeoptions = this.utilservice.getShelfTypeValue(product);
				this.simplevmForm.get('mastershelftype').patchValue(rcProperties.mainshelf);
				this.propertytitle = this.utilservice.getLoadLabel(product);
				this.simplevmForm.get('oarloadurl').patchValue(this.utilservice.getDefaultLoadValue(product));
				this.setMatrix(rcProperties.mainshelf);
			});
			this.spinner.confirm(false);
		});
	}

	setMatrix(shelf) {
		if (shelf == 'PSS36') {
			this.matrizoptions = this.matrixSizeForPSS36;
			this.simplevmForm.get('matrixsize').patchValue(this.currentmatrixpss36);
		} else {
			this.matrizoptions = this.matrixSizeForPSS64;
			this.simplevmForm.get('matrixsize').patchValue(this.currentmatrixpss64);
		}
	}

	deployvm() {
		this.spinner.confirm(true);
		this.service.selectAPI(APIConstants.CHECKIPTEMP, this.simplevmForm.get('vmname').value + '/' + this.simplevmForm.get('ipaddress').value + '/' + this.currentrcname).subscribe((status) => {
			this.spinner.confirm(false);
			if (status === 'OK') {
				this.proceedeployvm();
			} else if (status === 'overwrite confirmation both') {
				this.dialogs.confirm('Deployment', 'VM is already exist. Do you want overwrite?\nClick OK to confirm.', 'OK').subscribe((res) => {
					if (!res) {
						return;
					} else {
						this.proceedeployvm();
					}
				});
			} else if (status.indexOf('overwrite confirmation name') !== -1) {
				this.dialogs.confirm('Deployment', 'This Name is already assigned to another VM.\nDo you want overwrite? Click Ok to confirm.', 'OK').subscribe((res) => {
					if (!res) {
						return;
					} else {
						this.proceedeployvm();
					}
				});
			} else if (status === 'IP Address used for some other device') {
				this.dialogs.infoConfirm('Failed', 'IP Address is already in use for another device.', 'OK', 'info').subscribe((res) => {
					if (!res) {
						return;
					}
				});
			} else if (status.indexOf('overwrite confirmation ipaddress') !== -1) {
				this.dialogs.infoConfirm('Failed', 'IP Address is already in use for another VM.\nPlease correct it and try again.', 'OK', 'info').subscribe((res) => {
					if (!res) {
						return;
					}
				});
			} else if (status.indexOf('both used in different') != -1) {
				this.dialogs.infoConfirm('Failed', 'Both IP Address and VM Name are used for different VMs.\n Please correct it and try again.', 'OK', 'info').subscribe((res) => {
					if (!res) {
						return;
					}
				});
			}
		}, (err) => {
		});
	}

	proceedeployvm() {
		this.simplevmForm.value.nodetid == '' ? this.simplevmForm.controls['nodetid'].patchValue(this.simplevmForm.value.vmname) : this.simplevmForm.controls['nodetid'].patchValue(this.simplevmForm.value.nodetid);
		this.spinner.confirm(true);
		if (this.currentrcproduct == 'WDM') {
			this.service.addAPI(APIConstants.DEPLOYVM, this.utilservice.getDeployObject(this.simplevmForm.getRawValue(), this.userName, this.currentrcname, this.currentrcproduct)).subscribe((resultmsg) => {
				this.clearForm();
			});
		} else {
			this.service.addAPI(APIConstants.DEPLOYVMOCS, this.utilservice.getDeployObject(this.simplevmForm.getRawValue(), this.userName, this.currentrcname, this.currentrcproduct)).subscribe((resultmsg) => {
				this.clearForm();
			});
		}
	}

	clearForm(): any {
		this.dialogs.infoConfirm('Deployment', 'Deployment has started, please check the logs for more information.', 'OK', 'info').subscribe((res) => {
			this.spinner.confirm(false);
			this.service.getAPI(APIConstants.RETRIEVE_RC_DEPLOY)
				.subscribe((resourceconfiguration) => {
					this.resourceconfiguration = resourceconfiguration;
				}, (err) => {
					// this.utilsservice.log2('server failure in retriving vcenter(err.status)', err.status);
					// this.utilsservice.authenticationFailed(err.status);
				});
			this.displayhide = true;
			this.simplevmForm.reset();
		});
	}

	multideployClick() {
		const dialogRef = this.dialogRef.open(MultideployComponent, {
			data: this.utilservice.getDeployObject(this.simplevmForm.getRawValue(), this.userName, this.currentrcname, this.currentrcproduct)
		});
		dialogRef.afterClosed().subscribe(result => {
			if (result != 'normal') {
				this.clearForm();
			}
		});
	}

}

@Component({
	selector: 'v1830-multideploy',
	templateUrl: 'multideploy.component.html',
	styleUrls: ['./multideploy.component.css']
})

export class MultideployComponent implements OnInit, AfterViewInit {
	isShowProgress: boolean;
	duplicateerror: boolean = false;
	statusarray = [];
	showsetip: boolean = false;
	dataSource: MatTableDataSource<any>;
	multideployform: FormGroup;
	displayedColumns: string[] = ['vmname', 'ethoip', 'nebuild', 'notetid'];
	vmproperties = [];
	pagetitle = 'Deploy Multi VM';
	templateoptions: SelectOpion[] = [
		{ value: 'default', viewValue: 'DEFAULT' },
		{ value: 'st', viewValue: 'ST' },
		{ value: 'mh', viewValue: 'MH' }
	];
	constructor(public dialogRef: MatDialogRef<MultideployComponent>,
		@Inject(MAT_DIALOG_DATA) private data: any, private dialogs: DialogsService, private service: APIService) {
	}

	ngOnInit() {
		this.multideployform = new FormGroup({
			vmcount: new FormControl(1, [Validators.min(1), Validators.max(50)]),
			vmtemplate: new FormControl('default'),
			vmname: new FormControl(''),
			ethoip: new FormControl(''),
			nebuild: new FormControl(''),
			notetid: new FormControl(''),
			ipA: new FormControl('', [Validators.min(0), Validators.max(255)]),
			ipB: new FormControl('', [Validators.min(0), Validators.max(255)]),
			ipC: new FormControl('', [Validators.min(0), Validators.max(255)]),
			ipD: new FormControl('', [Validators.min(0), Validators.max(255)]),
			stepbyA: new FormControl('0', [Validators.min(0), Validators.max(255)]),
			stepbyB: new FormControl('0', [Validators.min(0), Validators.max(255)]),
			stepbyC: new FormControl('0', [Validators.min(0), Validators.max(255)]),
			stepbyD: new FormControl('1', [Validators.min(0), Validators.max(255)]),
		});
		this.multideployform.controls['vmtemplate'].setValue('default');
		this.vmproperties.push({ vmname: this.data.vmname, ethoip: this.data.ipaddress, nebuild: this.data.nebuild, notetid: this.data.vmname });
		this.dataSource = new MatTableDataSource(this.vmproperties);
		this.onChanges();
	}

	ngAfterViewInit() {
		this.multideployform.patchValue({
			ipA: this.data.ipaddress.split('.')[0],
			ipB: this.data.ipaddress.split('.')[1],
			ipC: this.data.ipaddress.split('.')[2],
			ipD: this.data.ipaddress.split('.')[3]
		});
	}
	onChanges() {
		this.multideployform.controls['vmcount'].valueChanges.subscribe(() => {
			if (this.multideployform.controls['vmcount'].value <= 50) {
				const currentcount = this.multideployform.controls['vmcount'].value - 1;
				this.vmproperties = [];
				this.vmproperties.push({ vmname: this.data.vmname, ethoip: this.data.ipaddress, nebuild: this.data.nebuild, notetid: this.data.vmname });
				const x: number[] = [this.multideployform.get('ipA').value, this.multideployform.get('ipB').value, this.multideployform.get('ipC').value, this.multideployform.get('ipD').value];
				const tem1 = x.join('.');
				this.changeTemplate(this.multideployform.controls['vmtemplate'].value);
				for (let i = 1; i <= currentcount; i++) {
					const count = i;
					const k: number[] = this.data.ipaddress.split('.');
					const stepvals: number[] = [this.multideployform.get('stepbyA').value, this.multideployform.get('stepbyB').value, this.multideployform.get('stepbyC').value, this.multideployform.get('stepbyD').value];
					const y: number[] = [0, 0, 0, 0];
					for (let j: number = 0; j < y.length; j++) {
						y[j] = Number(k[j]) + Number(stepvals[j]);
					}
					const userSetIpRange = y.join('.');
					this.vmproperties.push(
						{
							vmname: this.getNamePerTemplate(this.multideployform.get('vmtemplate').value, count, userSetIpRange, this.data.vmname),
							ethoip: userSetIpRange,
							nebuild: this.data.nebuild,
							notetid: this.getNamePerTemplate(this.multideployform.get('vmtemplate').value, count, userSetIpRange, this.data.vmname)
						}
					);
				}
			}

			this.dataSource = new MatTableDataSource(this.vmproperties);
		});
		this.multideployform.controls['vmtemplate'].valueChanges.subscribe(() => {
			this.changeTemplate(this.multideployform.controls['vmtemplate'].value);
		});
	}

	changeByStep() {
		const tempStepVals: number[] = [this.multideployform.get('stepbyA').value, this.multideployform.get('stepbyB').value, this.multideployform.get('stepbyC').value, this.multideployform.get('stepbyD').value];
		for (let n: number = 1; n < this.vmproperties.length; n++) {
			const x: number[] = this.vmproperties[n - 1].ethoip.split('.');
			const y: number[] = this.vmproperties[n].ethoip.split('.');
			for (let i: number = 0; i < y.length; i++) {
				y[i] = Number(x[i]) + Number(tempStepVals[i]);
				this.vmproperties[n].ethoip = y.join('.');
			}
		}
		this.changeTemplate(this.multideployform.get('vmtemplate').value);
	}

	onchange(ipa: boolean, ipb: boolean, ipc: boolean, ipd: boolean) {
		if (this.multideployform.get('ipA').value <= 255 && this.multideployform.get('ipB').value <= 255 && this.multideployform.get('ipC').value <= 255 && this.multideployform.get('ipD').value <= 255) {
			for (let i: number = 0; i < this.vmproperties.length; i++) {
				if (i !== 0) {
					this.changeByStep();
				} else {
					const x: number[] = this.vmproperties[i].ethoip.split('.');
					if (ipa === true) {
						x[0] = this.multideployform.get('ipA').value;
					} else if (ipb === true) {
						x[1] = this.multideployform.get('ipB').value;
					} else if (ipc === true) {
						x[2] = this.multideployform.get('ipC').value;
					} else if (ipd === true) {
						x[3] = this.multideployform.get('ipD').value;
					}
					this.vmproperties[i].ethoip = x.join('.');
				}
			}
			this.changeTemplate(this.multideployform.get('vmtemplate').value);
		}
	}

	changeTemplate(vmtemplate) {
		for (let m: number = 0; m < this.vmproperties.length; m++) {
			this.vmproperties[m].vmname = this.getNamePerTemplate(vmtemplate, m, this.vmproperties[m].ethoip, this.data.vmname);
			this.vmproperties[m].notetid = this.getNamePerTemplate(vmtemplate, m, this.vmproperties[m].ethoip, this.data.vmname);
		}
	}

	getNamePerTemplate(location, count, ipaddress, vmname) {
		if (location == 'mh') {
			const tempArr: any[] = ipaddress.split('.');
			let tempNameA = tempArr[2];
			let tempNameB = tempArr[3];
			while (tempNameA.length < 3) {
				tempNameA = '0' + tempNameA;
			}
			while (tempNameB.length < 3) {
				tempNameB = '0' + tempNameB;
			}
			return this.data.username + '-' + tempNameA + '-' + tempNameB;
		} else if (location == 'st') {
			const stdTemp = 'g';
			const tempArr: any[] = ipaddress.split('.');
			let tempNameA = tempArr[1];
			let tempNameB = tempArr[2];
			while (tempNameA.length < 3) {
				tempNameA = '0' + tempNameA;
			}
			while (tempNameB.length < 3) {
				tempNameB = '0' + tempNameB;
			}
			return stdTemp + tempNameA + tempNameB;
		} else {
			return vmname + '-' + count;
		}
	}

	onRefresh() {
		this.dataSource = new MatTableDataSource();
		this.multideployform.reset();
		this.multideployform.controls['vmcount'].setValue(1);
		this.multideployform.controls['vmtemplate'].setValue('default');
		this.multideployform.controls['ipA'].patchValue(this.data.ipaddress.split('.')[0]);
		this.multideployform.controls['ipB'].setValue(this.data.ipaddress.split('.')[1]);
		this.multideployform.controls['ipC'].setValue(this.data.ipaddress.split('.')[2]);
		this.multideployform.controls['ipD'].setValue(this.data.ipaddress.split('.')[3]);
		this.multideployform.controls['stepbyA'].setValue(0);
		this.multideployform.controls['stepbyB'].setValue(0);
		this.multideployform.controls['stepbyC'].setValue(0);
		this.multideployform.controls['stepbyD'].setValue(1);
		this.vmproperties[0].ethoip = this.data.ipaddress;
	}

	onmultideployclick() {
		this.isShowProgress = true;
		let checkdup = false;
		loop1:
		for (let i = 0; i < this.vmproperties.length; i++) {
			for (let j = 0; j < this.vmproperties.length; j++) {
				if (i == j) {
					continue;
				} else if (this.vmproperties[i].vmname == this.vmproperties[j].vmname
					|| this.vmproperties[i].ethoip == this.vmproperties[j].ethoip) {
					checkdup = true;
					break loop1;
				}
			}
		}
		this.vmstatecheck(checkdup);
	}

	vmstatecheck(duplicate) {
		if (!duplicate) {
			const temp = this.vmproperties.length;
			this.statusarray = [];
			for (let i = 0; i < this.vmproperties.length; i++) {
				this.service.selectAPI(APIConstants.CHECKIPTEMP, this.vmproperties[i].vmname + '/' + this.vmproperties[i].ethoip + '/' + this.data.rc)
					.subscribe((status) => {
						this.statusarray.push(status);
						if (i + 1 >= temp) {
							this.processStatus();
						}
					}, (err) => {
						console.log(err);
					});
			}
		} else {
			this.duplicateerror = true;
		}
	}

	processStatus() {
		if (this.statusarray.every((v) => v == 'OK')) {
			for (let i = 0; i < this.vmproperties.length; i++) {
				this.vmproperties[i].proceed = 'yes';
			}
			// this.proceedeployMultiCheckFile();
		} else if (this.statusarray.every((v) => v == 'both used in different')) {
			this.isShowProgress = false;
			this.dialogs.infoConfirm('Info', 'All the IP addresses are already in use.', 'OK', 'info').subscribe((res) => {
				if (res) {
				}
			});
			return;
		} else if (this.statusarray.every((v) => (v.indexOf('both used in different') != -1))) {
			this.isShowProgress = false;
			this.dialogs.infoConfirm('Info', 'All the Name and IP address are used in different VMs.', 'Ok', 'info').subscribe((res) => {
				if (res) {
				}
			});
			return;
		} else {
			let message = '';
			for (let i = 0; i < this.statusarray.length; i++) {
				if (this.statusarray[i] == 'IP Address used for some other device') {
					message = message + this.vmproperties[i].ethoip +
						' is used for another device. Cannot proceed<br>';
					this.vmproperties[i].proceed = 'no';
				} else if (this.statusarray[i] == 'OK') {
					message = message + this.vmproperties[i].vmname + ' is ok<br>';
					this.vmproperties[i].proceed = 'yes';
				} else if (this.statusarray[i] == 'overwrite confirmation both') {
					message = message + this.vmproperties[i].vmname +
						' is already exist. Deploy will overwrite the existing<br>';
					this.vmproperties[i].proceed = 'yes';
				} else if (this.statusarray[i].indexOf('overwrite confirmation name') != -1) {
					this.vmproperties[i].proceed = 'yes';
					message = message + this.vmproperties[i].vmname +
						' name is already exist for another VM.' +
						'Deploy will overwrite the existing<br>';
				} else if (this.statusarray[i].indexOf('overwrite confirmation ipaddress') != -1) {
					message = message + this.vmproperties[i].vmname +
						' is already in use for another VM, cannot proceed<br>';
					this.vmproperties[i].proceed = 'no';
				} else if (this.statusarray[i] == 'both used in different') {
					message = message + this.vmproperties[i].vmname +
						' both IP Address and VM Name are used for different VMs,' +
						'cannot proceed<br>';
					this.vmproperties[i].proceed = 'no';
				}
			}
			message = message + '<br><br><br>Click OK to confirm.';
			this.isShowProgress = false;
			this.dialogs.confirm('Deployment', message, 'OK').subscribe((res) => {
				if (res) {
					this.proceedeployMulti();
				} else {
					return;
				}
			});
		}
	}

	proceedeployMulti() {
		const sendValues = this.data;
		sendValues['vms'] = this.vmproperties;
		if (this.data.product == 'WDM') {
			this.service.addAPI(APIConstants.DEPLOYVM, sendValues).subscribe((resultmsg) => {
				this.dialogRef.close(resultmsg);
			});
		} else {
			this.service.addAPI(APIConstants.DEPLOYVMOCS, sendValues).subscribe((resultmsg) => {
				this.dialogRef.close(resultmsg);
			});
		}
	}
}

