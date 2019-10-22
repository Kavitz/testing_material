import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { APIService } from 'src/app/services/apiservice.service';
import { Resource, Vcenter, Ovf, SelectOpion } from 'src/app/model/v1830.model';
import { APIConstants } from 'src/app/services/constants';
import { Observable } from 'rxjs';
import { UtilService } from 'src/app/services/utils.service';
import { startWith, map } from 'rxjs/operators';

@Component({
	selector: 'v1830-editresource',
	templateUrl: './editresource.component.html',
	styleUrls: ['./editresource.component.css']
})
export class EditresourceComponent implements OnInit {
	isLinear = true;
	before: any;
	resourceform: FormGroup;
	simulationform: FormGroup;
	deploymentform: FormGroup;
	networkform: FormGroup;
	simbuilderform: FormGroup;
	currentrc: Resource;
	vcenters: Array<Vcenter>;
	ovfs: Array<Ovf>;
	datacenters: Array<String>;
	folders: Array<String>;
	clusters: Array<String>;
	datastores: Array<String>;
	networks: Array<String>;
	filteredOptions: Observable<string[]>;
	showportwdm: boolean = false;
	showmemvalidation: boolean = false;
	matrixSizeForPSS36: SelectOpion[] = this.utilservice.matrixSizeForPSS36;
    matrixSizeForPSS64: SelectOpion[] = this.utilservice.matrixSizeForPSS64;
    bootlevel: SelectOpion[] = this.utilservice.bootlevel;
    runlevel: SelectOpion[] = this.utilservice.runlevel;
    ramunit: SelectOpion[] = this.utilservice.ramunit;
	diskmodeopt: SelectOpion[] = this.utilservice.diskmodeopt;
	shelfmode: SelectOpion[] = this.utilservice.shelfModeWDM;
	shelfModeLabel: string;
	shelftyeoptions: string[] = ['PSS32', 'PSS16', 'PSS16II', 'PSS8', 'PSS4', 'PSS8x', 'PSS24x', 'PSS12x', 'PSI2T', 'PSIM'];
	loadLabel: string;
	constructor(private _formBuilder: FormBuilder, private service: APIService, public dialogRef: MatDialogRef<EditresourceComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private utilservice: UtilService) {
		this.currentrc = data;
		this.service.getAPI(APIConstants.RETRIEVE_VCENTER)
			.subscribe((vcenters) => {
				this.vcenters = vcenters;
			}, (err) => {
			});

		this.service.getAPI(APIConstants.OVF_URL)
			.subscribe((ovfs) => {
				this.ovfs = ovfs;
				this.callsetmethod();
			}, (err) => {
				this.callsetmethod();
			});
		this.getOtherValuesFromVC();
	}

	ngOnInit() {
		this.resourceform = this._formBuilder.group({
			name: [this.data.name, [Validators.required, Validators.pattern('^([a-zA-Z][a-zA-Z0-9._-]+$)|[a-zA-Z]')]],
			mqttserver: [this.data.mqttserver, Validators.required],
			vcenter: [this.data.vcenter, Validators.required],
			ovf: [this.data.ovftemplate, Validators.required],
			datacenter: [this.data.datacenter, Validators.required],
			folder: [this.data.folder],
			hostcluster: [this.data.cluster, Validators.required],
			datastore: [this.data.datastore, Validators.required],
			network: [this.data.network, Validators.required],
			networkgmre: [this.data.netgmre, Validators.required]
		});
		this.simulationform = this._formBuilder.group({
			mastershelftype: [this.data.mainshelf],
			shelfmode: [this.data.shelfmode],
			localinstall: [this.data.localinstall],
			neload: [this.data.neurl],
			gmreload: [this.data.gmreurl],
			oarload: [this.data.oarurl],
			bootlevel: [this.data.bootlevel],
			runlevel: [this.data.runlevel],
			matrixsizepss36: [this.data.matrixsize_pss36],
			matrixsizepss64: [this.data.matrixsize_pss64],
		});
		this.networkform = this._formBuilder.group({
			netoamp: [this.data.netoamp],
			nete1: [this.data.nete1],
			nete2: [this.data.nete2],
			nete3: [this.data.nete3],
			netvoip: [this.data.netvoip],
			netilan: [this.data.netilan],
			netcit: [this.data.netcit],
			netauxa: [this.data.netauxa],
			netauxs: [this.data.netauxb],
		});
		this.deploymentform = this._formBuilder.group({
			diskmode: [this.data.diskmode],
			ramsize: [this.data.ramsize],
			ramunit: [this.data.ramunit],
			numberofcores: [this.data.nocores, [Validators.required, Validators.pattern('[1-8]')]]
		});
		this.simbuilderform = this._formBuilder.group({
			webserverurl: [this.data.webserverurl],
			webserverdirectory: [this.data.webserverdir]
		});

		this.setOVFChanges(this.data.ovftemplate.product);
		this.filteredOptions = this.simulationform.get('mastershelftype').valueChanges
            .pipe(
                startWith(''),
                map(value => this._filter(value))
            );
		this.onChanges();
	}

	setOVFChanges(product: string): void {
		this.shelfmode = this.utilservice.getShelfModeValue(product);
		this.shelfModeLabel = this.utilservice.getShelfModeLabel(product);
		this.simulationform.get('shelfmode').patchValue(this.shelfmode[0].value);
		this.shelftyeoptions = this.utilservice.getShelfTypeValue(product);
		this.simulationform.get('mastershelftype').patchValue(this.data.mainshelf);
		this.loadLabel = this.utilservice.getLoadLabel(product) + ' Load URL';
		this.showportwdm = this.utilservice.showPorts(product);
		this.simulationform.get('oarload').patchValue(this.utilservice.getDefaultLoadValue(product));
	}

	onChanges(): void {
		this.resourceform.get('datacenter').disable();
		this.resourceform.get('folder').disable();
		this.resourceform.get('hostcluster').disable();
		this.resourceform.get('network').disable();
		this.resourceform.get('networkgmre').disable();
		this.resourceform.get('datastore').disable();
		this.resourceform.get('vcenter').valueChanges.subscribe(val => {
			if (val.name != '') {
				this.resourceform.get('datacenter').enable();
				this.service.postAPI(APIConstants.RETRIEVE_DATACENTER, this.data.vcenter)
					.subscribe((datacenters) => {
						this.datacenters = datacenters;
					}, (err) => {
						// this.utilsservice.log(err.status);
						// this.utilsservice.authenticationFailed(err.status);
					});
			}
		});
		this.resourceform.get('ovf').valueChanges.subscribe(val => {
			if (val.name != '') {
				this.setOVFChanges(val.product);
			}
		});
		this.resourceform.get('datacenter').valueChanges.subscribe(val => {
			if (val != '') {
				this.resourceform.get('hostcluster').enable();
				this.resourceform.get('folder').enable();
				const temp = this.resourceform.get('vcenter').value;
				temp['datacenter'] = val;
				this.service.postAPI(APIConstants.RETRIEVE_HOSTCLUSTER, temp)
					.subscribe((clusters) => {
						this.clusters = clusters;
					}, (err) => {
						// this.utilsservice.log(err.status);
						// this.utilsservice.authenticationFailed(err.status);
					});

				this.service.postAPI(APIConstants.RETRIEVE_FOLDER, temp)
					.subscribe((folders) => {
						this.folders = folders;
					}, (err) => {
						// this.utilsservice.log(err.status);
						// this.utilsservice.authenticationFailed(err.status);
					});
			}
		});
		this.resourceform.get('hostcluster').valueChanges.subscribe(val => {
			if (val != '') {
				this.resourceform.get('datastore').enable();
				this.resourceform.get('network').enable();
				this.resourceform.get('networkgmre').enable();
				const temp = this.resourceform.get('vcenter').value;
				temp['datacenter'] = this.resourceform.get('datacenter').value;
				temp['cluster'] = val;
				this.service.postAPI(APIConstants.RETRIEVE_DATASTORE, temp)
					.subscribe((datastores) => {
						this.datastores = datastores;
					}, (err) => {
						// this.utilsservice.log(err.status);
						// this.utilsservice.authenticationFailed(err.status);
					});
				this.service.postAPI(APIConstants.RETRIEVE_NETWORK, temp)
					.subscribe((networks) => {
						this.networks = networks;
					}, (err) => {
						// this.utilsservice.log(err.status);
						// this.utilsservice.authenticationFailed(err.status);
					});
			}
		});
		this.resourceform.get('network').valueChanges.subscribe(val => {
			if (val != '') {
				Object.keys(this.networkform.controls).forEach(key => {
					if (this.networkform.get(key).value == '') {
						this.networkform.get(key).patchValue(val);
					}
				});
			}
		});
		this.resourceform.get('mqttserver').valueChanges.subscribe(val => {
			if (val != '' && this.simbuilderform.get('webserverurl').value == '') {
				this.simbuilderform.get('webserverurl').patchValue('http://' + val);
			}
		});
		this.deploymentform.get('ramsize').valueChanges.subscribe(val => {
			this.showmemvalidation = this.utilservice.getRAMValidation(val, this.deploymentform.get('ramunit').value);
		});
		this.deploymentform.get('ramunit').valueChanges.subscribe(val => {
			this.showmemvalidation = this.utilservice.getRAMValidation(this.deploymentform.get('ramsize').value, val);
		});
		this.resourceform.valueChanges.subscribe(val => {
			this.resourceform.valid ? this.isLinear = false : this.isLinear = true;
		});
	}

	callsetmethod() {
		this.resourceform.get('vcenter').setValue(this.data.vcenter);
		this.resourceform.get('ovf').setValue(this.data.ovftemplate);
	}

	getOtherValuesFromVC() {
		this.service.postAPI(APIConstants.RETRIEVE_DATACENTER, this.data.vcenter)
			.subscribe((datacenters) => {
				this.datacenters = datacenters;
			}, (err) => {
				// this.utilsservice.log(err.status);
				// this.utilsservice.authenticationFailed(err.status);
			});

		const temp1 = this.data.vcenter;
		temp1.datacenter = this.data.datacenter;
		this.service.postAPI(APIConstants.RETRIEVE_HOSTCLUSTER, temp1)
			.subscribe((clusters) => {
				this.clusters = clusters;
			}, (err) => {
				// this.utilsservice.log(err.status);
				// this.utilsservice.authenticationFailed(err.status);
			});

		this.service.postAPI(APIConstants.RETRIEVE_FOLDER, temp1)
			.subscribe((folders) => {
				this.folders = folders;
			}, (err) => {
				// this.utilsservice.log(err.status);
				// this.utilsservice.authenticationFailed(err.status);
			});
		temp1.cluster = this.data.cluster;
		this.service.postAPI(APIConstants.RETRIEVE_DATASTORE, temp1)
			.subscribe((datastores) => {
				this.datastores = datastores;
			}, (err) => {
				// this.utilsservice.log(err.status);
				// this.utilsservice.authenticationFailed(err.status);
			});
		this.service.postAPI(APIConstants.RETRIEVE_NETWORK, temp1)
			.subscribe((networks) => {
				this.networks = networks;
			}, (err) => {
				// this.utilsservice.log(err.status);
				// this.utilsservice.authenticationFailed(err.status);
			});
	}

	private _filter(value: string): string[] {
        if (value) {
            const filterValue = value.toLowerCase();
            return this.shelftyeoptions.filter(option => option.toLowerCase().includes(filterValue));
        }
	}

	compareFn(c1: any, c2: any): boolean {
		return c1 && c2 ? c1.name === c2.name : c1 === c2;
	}

	editResourceConfig(): void {
		this.service.deleteAPI(APIConstants.RESOURCE_URL, this.resourceform.get('name').value)
			.subscribe((logmsg) => {
				if (logmsg.affectedRows == 1) {
					const addrc = this.utilservice.getADDData('DB', this.resourceform.value, this.simulationform.value, this.networkform.value, this.deploymentform.value, this.simbuilderform.value);
					this.service.postAPI(APIConstants.RESOURCE_URL, addrc)
						.subscribe((addresult) => {
							if (addresult.affectedRows == 1) {
								const addrcfile = this.utilservice.getADDData('File', this.resourceform.value, this.simulationform.value, this.networkform.value, this.deploymentform.value, this.simbuilderform.value);
								this.service.postAPI(APIConstants.ADDRC_FILE, addrcfile)
									.subscribe((fileresult) => {
										this.dialogRef.close();
									});
							}
						}, (err) => {
							// this.utilsservice.log(err.status);
							// this.utilsservice.authenticationFailed(err.status);
						});
				}
			}, (err) => {
				// this.utilsservice.log2('server failure in deleting resource(err.status)', err.status);
			});
	}
}
