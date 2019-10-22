import { Component, OnInit } from '@angular/core';
import { DialogsService } from '../dialogs/dialogs.service';
import { APIConstants } from '../../services/constants';
import { UtilService } from '../../services/utils.service';
import { APIService } from '../../services/apiservice.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Vcenter, Resource } from '../../model/v1830.model';
import { EditresourceComponent } from './editresource.component';
import { AddResourcesComponent } from './addresource.component';

@Component({
    selector: 'v1830-main-resources',
    templateUrl: './main-resources.component.html',
    styleUrls: ['./main-resources.component.css']
})
export class MainResourcesComponent implements OnInit {

    pagetitle = 'Manage Resources';
    refreshbtn: boolean = true;
    addbtn: boolean = true;
    searchbtn: boolean = true;
    show: boolean;
    hide = true;
    buttonname: string;
    result: boolean;
    addclick = true;
    resourceVal: Resource = { name: '', mqttserver: '', vcenter: '', ovftemplate: '', datastore: '', datacenter: '', cluster: '', network: '', netgmre: '', netoamp: '', nete1: '', nete2: '', nete3: '', netvoip: '', netilan: '', netcit: '', netauxa: '', netauxb: '', diskmode: 'nomode', nocores: 1, ramsize: 2, mainshelf: 'PSS32', shelfmode: 'SONET', localinstall: false, neurl: 'https://virtual1830.es-si-s3-z2.eecloud.nsn-net.net/loads/NE/', gmreurl: 'https://virtual1830.es-si-s3-z2.eecloud.nsn-net.net/loads/GMRE/', oarurl: 'https://virtual1830.es-si-s3-z2.eecloud.nsn-net.net/loads/OAR/', bootlevel: 'ready', runlevel: 'commission', folder: '', ramunit: 'gb', webserverdir: '/var/www/html', webserverurl: '', matrixsize_pss36: '1920', matrixsize_pss64: '3840', disableRC: false };
    columns: { columnDef: string; header: string; width: string; dispcolumn: boolean; cell: (element: any) => string; }[] = [
        { columnDef: 'name', header: 'Name', width: '1%', dispcolumn: false, cell: (element: any) => `${element.name}` },
        { columnDef: 'ovfdefault', header: 'OVF Template', width: '1%', dispcolumn: false, cell: (element: any) => `${element.ovfdefault}` },
        { columnDef: 'vcenter', header: 'vCenter', width: '1%', dispcolumn: false, cell: (element: any) => `${element.vcenter}` },
        { columnDef: 'disableRC', header: 'Enabled', width: '1%', dispcolumn: false, cell: (element: any) => `${element.disableRC}` }
    ];
    elements: any;
    vcenters: Vcenter;
    ovfs: any;
    constructor(private dialogs: DialogsService, private service: APIService, private utilsservice: UtilService, private router: Router, public dialog: MatDialog) {
        this.buttonname = 'Add';
        this.show = true;
        this.getResources();
        this.service.getAPI(APIConstants.RETRIEVE_VCENTER)
            .subscribe((vcenters) => {
                this.vcenters = vcenters;
            }, (err) => {
                // this.utilsservice.log2('server failure in retriving ovfs(err.status)', err.status);
                // this.utilsservice.authenticationFailed(err.status);
            });
        this.service.getAPI(APIConstants.OVF_URL)
            .subscribe((ovfs) => {
                this.ovfs = ovfs;
            }, (err) => {
                // this.utilsservice.log2('server failure in retriving ovfs(err.status)', err.status);
                // this.utilsservice.authenticationFailed(err.status);
            });
    }

    ngOnInit() {
    }

    getResources() {
        this.service.getAPI(APIConstants.RESOURCE_URL)
            .subscribe((resources) => {
                this.elements = resources;
            }, (err) => {
                // this.utilsservice.log2('server failure in retriving ovfs(err.status)', err.status);
                // this.utilsservice.authenticationFailed(err.status);
            });
    }

    applyFilter(filterValue: string) {
        this.elements.filter = filterValue.trim().toLowerCase();
    }

    onAddClick() {
        const dialogRef = this.dialog.open(AddResourcesComponent, { disableClose: true, data: this.resourceVal });
        dialogRef.afterClosed().subscribe(result => {
            this.refreshClick();
        });
    }

    onEdit(row) {
        let tempvcenter;
		let tempovf;
        let currentrc;
		for (let i in this.vcenters) {
			if (this.vcenters[i].name == row.vcenter) {
				tempvcenter = this.vcenters[i];
				break;
			}
		}
		// tslint:disable-next-line:forin
		for (let i in this.ovfs) {
			if (this.ovfs[i].name == row.ovfdefault) {
				tempovf = this.ovfs[i];
				break;
			}
        }
		currentrc = {
			name: row.name, mqttserver: row.mqttserver, diskmode: row.diskmode, localinstall: row.localinstall,
			ovftemplate: tempovf, vcenter: tempvcenter, datacenter: row.datacenter, datastore: row.datastore, cluster: row.cluster,
			network: row.network, netgmre: row.netgmre, netoamp: row.netoamp, nete1: row.nete1, nete2: row.nete2,
			nete3: row.nete3, netvoip: row.netvoip, netilan: row.netilan, netcit: row.netcit, netauxa: row.netauxa,
			netauxb: row.netauxb, nocores: row.nocores, ramsize: row.ramsize, mainshelf: row.mainshelf, shelfmode: row.shelfmode, neurl: row.neurl, gmreurl: row.gmreurl, oarurl: row.oarurl, bootlevel: row.bootlevel, runlevel: row.runlevel, folder: row.folder, ramunit: row.ramunit, webserverdir: row.webserverdir, webserverurl: row.webserverurl, matrixsize_pss36: row.matrixsize_pss36, matrixsize_pss64: row.matrixsize_pss64, disableRC: row.disableRC
		};
        const dialogRef = this.dialog.open(EditresourceComponent, { disableClose: true, data: currentrc });
        dialogRef.afterClosed().subscribe(result => {
            this.refreshClick();
        });
    }

    refreshClick() {
        this.getResources();
    }

    onDelete(row) {
        this.dialogs.confirm('Delete Resource', 'Are you sure you want to delete ' + row.name + ' ?', 'Delete').subscribe((resource) => {
            if (resource) {
                this.service.deleteAPI(APIConstants.RESOURCE_URL, row.name)
                    .subscribe((logmsg) => {
                        if (logmsg.affectedRows == 1) {
                            this.refreshClick();
                        }
                    }, (err) => {
                        this.utilsservice.log2('server failure in deleting resource(err.status)', err.status);
                    });
            }
        });
    }

    onDisableResource(data) {
        this.service.postAPI(APIConstants.UPDATE_RC_DISABLE, data)
        .subscribe((result1) => {
        });
    }
}
