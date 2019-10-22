import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { APIService } from '../../services/apiservice.service';
import { APIConstants } from '../../services/constants';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { DialogsService } from '../dialogs/dialogs.service';
import { UtilService } from '../../services/utils.service';
// tslint:disable-next-line:import-destructuring-spacing
import { FileValidator } from '../simbuilder/input.file.validator';
import { SpinnerService } from '../spinner/spinner.service';
@Component({
    selector: 'v1830-simbuilder',
    templateUrl: './simbuilder.component.html',
    styleUrls: ['./simbuilder.component.css'],
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
export class SimbuilderComponent {
    pagetitle = 'Simlist Configuration';
    refreshbtn = true;
    addbtn = true;
    simbuilderlist;
    simbuilder = true;
    submitbuttonaction: string;
    clearbuttonaction: string;
    file;
    file1;
    simbuilderform: FormGroup;
    searchbtn = true;
    resourceconfiguration: string[] = [];
    showform = false;
    buttonname;
    filename;
    choosenfile = true;
    choosenfile1 = true;
    elements: any;
    simlisterror = false;
    simlisterror1 = false;
    @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
    currentsimlist: any = {
        filename: '', vm_group: '', loadname: '', gmre_load_name: '', gmre_ip_address: '', resourceconfig: '',
        install: '', provision: '', forceinstall: '', port_number: '', no_of_parallel_install: '', delay_btw_install: '', oar_load_name: ''
    };
    columns: { columnDef: string; header: string; width: string; dispcolumn: boolean; cell: (element: any) => string; }[] = [
        { columnDef: 'filename', header: 'File Name', width: '10%', dispcolumn: false, cell: (element: any) => `${element.filename}` },
        { columnDef: 'mappingfile', header: 'Mapping File', width: '1%', dispcolumn: true, cell: (element: any) => `${element.mappingfile}` },
        { columnDef: 'ne_load', header: 'NE Load', width: '3%', dispcolumn: false, cell: (element: any) => `${element.ne_load}` },
        { columnDef: 'gmre_load', header: 'GMRE Load', width: '1%', dispcolumn: true, cell: (element: any) => `${element.gmre_load}` },
        { columnDef: 'oar_load', header: 'OAR Load', width: '1%', dispcolumn: true, cell: (element: any) => `${element.oar_load}` },
        { columnDef: 'fiber_ip_address', header: 'Fiber_IP_Address', width: '1%', dispcolumn: true, cell: (element: any) => `${element.fiber_ip_address}` },
        { columnDef: 'resourceconfig', header: 'ResourceConfig', width: '1%', dispcolumn: true, cell: (element: any) => `${element.resourceconfig}` },
        { columnDef: 'install', header: 'Install', width: '1%', dispcolumn: true, cell: (element: any) => `${element.install}` },
        { columnDef: 'provision', header: 'Provision', width: '1%', dispcolumn: true, cell: (element: any) => `${element.provision}` },
        { columnDef: 'forceinstall', header: 'ForceInstall', width: '1%', dispcolumn: true, cell: (element: any) => `${element.forceinstall}` },
        { columnDef: 'user_id', header: 'User Name', width: '3%', dispcolumn: false, cell: (element: any) => `${element.user_id}` },
        { columnDef: 'no_parallel_install', header: 'No_Parallel_Install', width: '1%', dispcolumn: true, cell: (element: any) => `${element.no_parallel_install}` },
        { columnDef: 'vm_group', header: 'VM_Group', width: '1%', dispcolumn: true, cell: (element: any) => `${element.vm_group}` },
        { columnDef: 'delay_bet_install', header: 'Delay_Bet_Install', width: '1%', dispcolumn: true, cell: (element: any) => `${element.delay_bet_install}` }
    ];
    errormessage: string;
    currentsimbuilder: any;
    mfilename: string;

    constructor(private service: APIService, private cd: ChangeDetectorRef, private dialogs: DialogsService, private utilsservice: UtilService, private el: ElementRef, private spinner: SpinnerService) {
        this.submitbuttonaction = 'Add';
        this.clearbuttonaction = 'Clear';
        this.service.getAPI(APIConstants.RETRIEVE_RESOURCE)
            .subscribe((resourceconfiguration) => {
                this.resourceconfiguration = resourceconfiguration;

            }, (err) => {
                // this.utilsservice.log2('server failure in retriving vcenter(err.status)', err.status);
                // this.utilsservice.authenticationFailed(err.status);
            });
        this.getsimList();
        this.createForm();
    }

    createForm() {
        this.simbuilderform = new FormGroup({
            filename: new FormControl('', Validators.required),
            mappingfile: new FormControl(''),
            resourceconfig: new FormControl('', Validators.required),
            ne_load: new FormControl(''),
            gmre_load: new FormControl(''),
            oar_load: new FormControl(''),
            fiber_ip_address: new FormControl(''),
            fiber_port: new FormControl(''),
            install: new FormControl(true),
            provision: new FormControl(true),
            forceinstall: new FormControl(true),
            no_parallel_install: new FormControl('1'),
            vm_group: new FormControl(''),
            delay_bet_install: new FormControl('0')
        });
    }

    refreshClick() {
        this.getsimList();
    }

    onAddClick() {
        this.showform = true;
        this.submitbuttonaction = 'Add';
        this.clearbuttonaction = 'Clear';
        this.simbuilderform.controls['filename'].enable();
        this.choosenfile = true;
        this.simbuilderform.patchValue({
            install: true, provision: true, forceinstall: true, no_parallel_install: 1, delay_bet_install: 0
        });
        this.errormessage = '';
        this.mfilename = '';
        this.clearFormGroupDirective('Clear');
    }

    closeFormGroupDirective() {
        this.formGroupDirective.resetForm();

        // this.hidevalidationerror = true;
        this.showform = false;
    }

    clearFormGroupDirective(clearorreset) {
        // this.hidevalidationerror = true;
        if (clearorreset == 'Clear') {
            this.formGroupDirective.resetForm();
            this.mfilename = '';
            this.filename = '';
            this.simbuilderform.patchValue({
                install: true, provision: true, forceinstall: true, no_parallel_install: 1, delay_bet_install: 0
            });
        } else {
            this.setFormValues();
        }
    }

    onEdit(row) {
        this.currentsimlist = Object.assign({}, row);
        this.submitbuttonaction = 'Update';
        this.clearbuttonaction = 'Reset';
        this.showform = true;
        this.setFormValues();
        this.choosenfile = false;
        this.choosenfile1 = false;
    }

    setFormValues() {
        this.simbuilderform.controls['filename'].disable();
        this.simbuilderform.controls['mappingfile'].setValue(this.currentsimlist.mappingfile);
        this.mfilename = this.currentsimlist.mappingfile;
        this.simbuilderform.controls['filename'].setValue(this.currentsimlist.filename);
        this.simbuilderform.controls['resourceconfig'].setValue(this.currentsimlist.resourceconfig);
        this.simbuilderform.controls['ne_load'].setValue(this.currentsimlist.ne_load);
        this.simbuilderform.controls['gmre_load'].setValue(this.currentsimlist.gmre_load);
        this.simbuilderform.controls['oar_load'].setValue(this.currentsimlist.oar_load);
        this.simbuilderform.controls['fiber_ip_address'].setValue(this.currentsimlist.fiber_ip_address);
        this.simbuilderform.controls['fiber_port'].setValue(this.currentsimlist.fiber_port);
        this.simbuilderform.controls['no_parallel_install'].setValue(this.currentsimlist.no_parallel_install);
        this.simbuilderform.controls['vm_group'].setValue(this.currentsimlist.vm_group);
        this.simbuilderform.controls['delay_bet_install'].setValue(this.currentsimlist.delay_bet_install);
        if (this.currentsimlist.install == '0') {
            this.simbuilderform.controls['install'].setValue(false);
        } else {
            this.simbuilderform.controls['install'].setValue(true);
        }
        if (this.currentsimlist.forceinstall == '0') {
            this.simbuilderform.controls['forceinstall'].setValue(false);
        } else {
            this.simbuilderform.controls['forceinstall'].setValue(true);
        }
        if (this.currentsimlist.provision == '0') {
            this.simbuilderform.controls['provision'].setValue(false);
        } else {
            this.simbuilderform.controls['provision'].setValue(true);
        }
    }

    onDelete(row) {
        this.dialogs.confirm('Delete vCenter', 'Are you sure you want to delete ' + row.filename + ' ?', 'Delete').subscribe((res) => {
            if (res) {
                // DELETE_SIMLIST
                this.spinner.confirm(true);
                this.service.deleteAPI(APIConstants.DELETE_SIMLIST, row.filename)
                    .subscribe((logmsg) => {
                        if (logmsg.affectedRows === 1) {
                            this.refreshClick();
                            this.spinner.confirm(true);
                        }
                    }, (err) => {
                        this.utilsservice.log2('server failure in deleting vcenter(err.status)', err.status);
                    });
            }
        });
    }

    applyFilter(filterValue: string) {
        this.elements.filter = filterValue.trim().toLowerCase();
    }

    getsimList() {
        this.spinner.confirm(true);
        this.service.getAPI(APIConstants.RETRIEVE_SIMLIST)
            .subscribe((simlist) => {
                this.elements = simlist;
                this.spinner.confirm(false);
            }, (err) => {
                // this.utilsservice.log2('server failure in retriving vcenter(err.status)', err.status);
                // this.utilsservice.authenticationFailed(err.status);
            });
    }

    onDeploy(row) {
        this.spinner.confirm(true);
        this.dialogs.confirm('Deploy', 'Are you sure you want to proceed deployment ?', 'Deploy').subscribe((res) => {
            if (res) {
                this.service.deployAPI(APIConstants.DODEPLOY, row).subscribe((result) => {
                    this.spinner.confirm(false);
                });
            }
        });
    }

    editSimbuilderFields() {
        this.spinner.confirm(true);
        this.currentsimlist = this.simbuilderform.getRawValue();
        if (this.currentsimlist.install == '0') {
            this.currentsimlist.install = false;
        } else {
            this.currentsimlist.install = true;
        }
        if (this.currentsimlist.forceinstall == '0') {
            this.currentsimlist.forceinstall = false;
        } else {
            this.currentsimlist.forceinstall = true;
        }
        if (this.currentsimlist.provision == '0') {
            this.currentsimlist.provision = false;
        } else {
            this.currentsimlist.provision = true;
        }
        this.service.editAPI(APIConstants.EDIT_SIMLIST, this.currentsimlist.filename, this.currentsimlist).subscribe((logmsg) => {
            this.refreshClick();
            if (logmsg == 'updated') {
                this.closeFormGroupDirective();
                this.showform = false;
                this.refreshClick();
                this.spinner.confirm(false);
            }
        });
    }

    onFileChange1(val) {
        this.simlisterror1 = false;
        this.file1 = val.target.files[0];
        const reader = new FileReader();
        if (val.target.files && val.target.files.length) {
            const [fileval] = val.target.files;
            this.mfilename = fileval.name;
            reader.readAsDataURL(fileval);
            reader.onload = () => {
                this.simbuilderform.patchValue({
                    file: reader.result
                });
            };
        }
    }

    onFileChange(val) {
        this.simlisterror = false;
        this.file = val.target.files[0];
        const reader = new FileReader();
        if (val.target.files[0].type != 'text/xml') {
            this.simlisterror = true;
            this.filename = '';
        } else if (val.target.files && val.target.files.length) {
            const [fileval] = val.target.files;
            this.filename = fileval.name;
            reader.readAsDataURL(fileval);
            reader.onload = () => {
                this.simbuilderform.patchValue({
                    file: reader.result
                });
            };
        }
    }

    addOtherData(success, mappingfile) {
        this.spinner.confirm(true);
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        this.currentsimlist = this.simbuilderform.getRawValue();
        if (this.currentsimlist.install == '0') {
            this.currentsimlist.install = false;
        } else {
            this.currentsimlist.install = true;
        }
        if (this.currentsimlist.forceinstall == '0') {
            this.currentsimlist.forceinstall = false;
        } else {
            this.currentsimlist.forceinstall = true;
        }
        if (this.currentsimlist.provision == '0') {
            this.currentsimlist.provision = false;
        } else {
            this.currentsimlist.provision = true;
        }

        const temp = {
            filename: success, mappingfile: mappingfile, resourceconfig: this.simbuilderform.getRawValue().resourceconfig, ne_load: this.simbuilderform.getRawValue().ne_load, gmre_load: this.simbuilderform.getRawValue().gmre_load, oar_load: this.simbuilderform.getRawValue().oar_load, fiber_ip_address: this.simbuilderform.getRawValue().fiber_ip_address, fiber_port: this.simbuilderform.getRawValue().fiber_port, install: this.simbuilderform.getRawValue().install, provision: this.simbuilderform.getRawValue().provision, forceinstall: this.simbuilderform.getRawValue().forceinstall, no_parallel_install: this.simbuilderform.getRawValue().no_parallel_install, vm_group: this.simbuilderform.getRawValue().vm_group, delay_bet_install: this.simbuilderform.getRawValue().delay_bet_install, user_id: currentUser.username
        };
        this.service.addAPI(APIConstants.ADD_SIMLIST, temp).subscribe((logmsg) => {
            this.clearFormGroupDirective('Clear');
            this.refreshClick();
            this.spinner.confirm(true);
        });

    }

    addSimbuilderFields() {
        this.choosenfile = true;
        this.choosenfile1 = true;
        if (this.simbuilderform.valid) {
            if (this.submitbuttonaction === 'Update') {
                this.choosenfile = false;
                this.choosenfile1 = false;
                this.editSimbuilderFields();
            } else if (this.submitbuttonaction === 'Add') {
                const formData = new FormData();
                const formData1 = new FormData();
                formData.append('simlistfile', this.file);
                formData1.append('mappingfile', this.file1);
                this.service.uploadSimlistFile(APIConstants.UPLOADSIMLISTFILE, formData).subscribe((success) => {
                    if (this.file1 != undefined) {
                        this.service.uploadSimlistFile(APIConstants.UPLOADMAPPINGFILE, formData1).subscribe((mappingfile) => {
                            this.addOtherData(success, mappingfile);
                        });
                    } else {
                        this.addOtherData(success, '');
                    }
                });
            }
        }
    }
}

