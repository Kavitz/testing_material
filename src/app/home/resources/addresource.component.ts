import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Vcenter, Ovf, SelectOpion, Resource } from '../../model/v1830.model';
import { Observable } from 'rxjs';
import { APIConstants } from '../../services/constants';
import { APIService } from '../../services/apiservice.service';
import { startWith, map } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UtilService } from 'src/app/services/utils.service';
import { SpinnerService } from '../spinner/spinner.service';

@Component({
    selector: 'v1830-addeditresource',
    templateUrl: './addresource.component.html',
    styleUrls: ['./addresource.component.css']
})
export class AddResourcesComponent implements OnInit {
    isLinear = true;
    resourceform: FormGroup;
    simulationform: FormGroup;
    deploymentform: FormGroup;
    networkform: FormGroup;
    simbuilderform: FormGroup;
    vcenters$: Observable<Array<Vcenter>>;
    ovfs$: Observable<Array<Ovf>>;
    datacenters$: Observable<Array<String>>;
    folders$: Observable<Array<String>>;
    clusters$: Observable<Array<String>>;
    datastores$: Observable<Array<String>>;
    networks$: Observable<Array<String>>;
    shelftyeoptions: string[];
    filteredOptions: Observable<string[]>;
    showportwdm = true;
    shelfModeLabel: string = 'Shelf Mode';
    shelfmode: SelectOpion[];
    before: any;
    loadLabel: string = 'OAR Load';
    showmemvalidation: boolean = false;
    matrixSizeForPSS36: SelectOpion[] = this.utilservice.matrixSizeForPSS36;
    matrixSizeForPSS64: SelectOpion[] = this.utilservice.matrixSizeForPSS64;
    bootlevel: SelectOpion[] = this.utilservice.bootlevel;
    runlevel: SelectOpion[] = this.utilservice.runlevel;
    ramunit: SelectOpion[] = this.utilservice.ramunit;
    diskmodeopt: SelectOpion[] = this.utilservice.diskmodeopt;
    hidevalidationerror: boolean;
    errormessage: string;

    constructor(private _formBuilder: FormBuilder, private service: APIService, public dialogRef: MatDialogRef<AddResourcesComponent>, @Inject(MAT_DIALOG_DATA) public data: Resource, private utilservice: UtilService, private spinner: SpinnerService) {
        this.service.getAPI(APIConstants.GETADMINPREFERENCE).subscribe((result) => {
            if (result != undefined && result != null) {
                this.simulationform.controls['runlevel'].setValue(result.defaultrunlevel);
            }
        });
    }

    ngOnInit() {
        this.vcenters$ = this.service.getAPI(APIConstants.RETRIEVE_VCENTER);
        this.ovfs$ = this.service.getAPI(APIConstants.OVF_URL);
        this.resourceform = this._formBuilder.group({
            name: [this.data.name, [Validators.required, Validators.pattern('^[A-Za-z_ |-][A-Za-z0-9_ |-]*$')]],
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
        this.filteredOptions = this.simulationform.get('mastershelftype').valueChanges
            .pipe(
                startWith(''),
                map(value => this._filter(value))
            );
        this.onChanges();
    }

    onChanges() {
        this.resourceform.get('datacenter').disable();
        this.resourceform.get('folder').disable();
        this.resourceform.get('hostcluster').disable();
        this.resourceform.get('network').disable();
        this.resourceform.get('networkgmre').disable();
        this.resourceform.get('datastore').disable();
        this.resourceform.get('vcenter').valueChanges.subscribe(val => {
            if (val.name != '') {
                this.resourceform.get('datacenter').enable();
                this.datacenters$ = this.service.postAPI(APIConstants.RETRIEVE_DATACENTER, val);
            }
        });
        this.resourceform.get('ovf').valueChanges.subscribe(val => {
            if (val.name != '') {
                this.shelfmode = this.utilservice.getShelfModeValue(val.product);
                this.shelfModeLabel = this.utilservice.getShelfModeLabel(val.product);
                this.simulationform.get('shelfmode').patchValue(this.shelfmode[0].value);
                this.shelftyeoptions = this.utilservice.getShelfTypeValue(val.product);
                this.simulationform.get('mastershelftype').patchValue(this.shelftyeoptions[0]);
                this.loadLabel = this.utilservice.getLoadLabel(val.product) + ' Load URL';
                this.showportwdm = this.utilservice.showPorts(val.product);
                this.simulationform.get('oarload').patchValue(this.utilservice.getDefaultLoadValue(val.product));
            }
        });
        this.resourceform.get('datacenter').valueChanges.subscribe(val => {
            if (val != '') {
                this.resourceform.get('hostcluster').enable();
                this.resourceform.get('folder').enable();
                const temp = this.resourceform.get('vcenter').value;
                temp['datacenter'] = val;
                this.clusters$ = this.service.postAPI(APIConstants.RETRIEVE_HOSTCLUSTER, temp);
                this.folders$ = this.service.postAPI(APIConstants.RETRIEVE_FOLDER, temp);
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
                this.datastores$ = this.service.postAPI(APIConstants.RETRIEVE_DATASTORE, temp);
                this.networks$ = this.service.postAPI(APIConstants.RETRIEVE_NETWORK, temp);
            }
        });
        this.deploymentform.get('ramsize').valueChanges.subscribe(val => {
			this.showmemvalidation = this.utilservice.getRAMValidation(val, this.deploymentform.get('ramunit').value);
		});
		this.deploymentform.get('ramunit').valueChanges.subscribe(val => {
			this.showmemvalidation = this.utilservice.getRAMValidation( this.deploymentform.get('ramsize').value, val);
		});
        this.resourceform.valueChanges.subscribe(val => {
            this.resourceform.valid ? this.isLinear = false : this.isLinear = true;
        });
    }

    private _filter(value: string): string[] {
        if (value) {
            const filterValue = value.toLowerCase();
            return this.shelftyeoptions.filter(option => option.toLowerCase().includes(filterValue));
        }
    }

    addResourceConfig() {
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
                    if (err.status == '400') {
                        if (err._body.indexOf('ER_DUP_ENTRY') != -1) {
                            this.errormessage = 'Resource Name is already available, Name must unique for each entry.';
                        } else {
                            this.errormessage = 'Add Failed, Please try again';
                        }
                    }
            });
    }

    selectionChange(event) {
        if (event.selectedIndex != 0) {
            Object.keys(this.networkform.controls).forEach(key => {
                if (this.networkform.get(key).value == '') {
                    this.networkform.get(key).patchValue(this.resourceform.get('network').value);
                }
            });
            if (this.simbuilderform.get('webserverurl').value == '') {
                this.simbuilderform.get('webserverurl').patchValue('http://' + this.resourceform.get('mqttserver').value);
            }
        }
    }
}
