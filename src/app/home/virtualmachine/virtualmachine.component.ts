import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, Inject, OnDestroy, Output, OnChanges } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Observable } from 'rxjs/internal/Observable';
import { MainResources, SelectOpion } from '../../model/v1830.model';
import { APIService } from '../../services/apiservice.service';
import { DialogsService } from '../dialogs/dialogs.service';
import { DataserviceService } from '../../services/dataservice.service';
import { APIConstants } from '../../services/constants';
import { SelectionModel } from '@angular/cdk/collections';
import { SpinnerService } from '../spinner/spinner.service';
import { FormGroup, FormControl } from '@angular/forms';
import { EventEmitter } from 'events';
export interface Deployment {
	vmname: string;
	username: string;
	status: string;
	starttime: string;
	endtime: string;
}

@Component({
	selector: 'v1830-virtualmachine',
	templateUrl: './virtualmachine.component.html',
	styleUrls: ['./virtualmachine.component.css']
})
export class VirtualmachineComponent implements OnInit, OnChanges {
	observer: any;
	resourceconfigs: any;
	elements: any;
	logMessage: any;
	title: any;
	private autoRefresh: any;
	autorefreshlog = true;
	private autorefreshtable: any;
	private autorefreshlogtable = false;
	private ifautorefreshlogtable = false;
	private ifautorefreshlog = true;
	displayedColumns: string[];
	selectedLogs: Array<string> = [];
	dataSource: MatTableDataSource<any>;
	mainresources$: Observable<Array<MainResources>>;
	togglerefresh = true;
	message: string;
	name: string;
	pagetitle = 'Virtual Machines';
	private currentvcenter: any;
	private currentrc: any;
	selection: SelectionModel<any>;
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	nameFilter = new FormControl('');
	idFilter = new FormControl('');
	colourFilter = new FormControl('');
	petFilter = new FormControl('');
	filterValues = {
		vmname: '',
		ipaddress: '',
		state: ''
	};
	columns: { columnDef: string; header: string; width: string; dispcolumn: boolean; cell: (element: any) => string; }[] = [
		{ columnDef: 'seelect', header: 'Select', width: '5%', dispcolumn: false, cell: (element: any) => `${''}` },
		{ columnDef: 'vmname', header: 'VM Name', width: '5%', dispcolumn: false, cell: (element: any) => `${element.vmname}` },
		{ columnDef: 'ipaddress', header: 'IP Address', width: '5%', dispcolumn: false, cell: (element: any) => `${element.ipaddress}` },
		{ columnDef: 'state', header: 'State', width: '5%', dispcolumn: false, cell: (element: any) => `${element.state}` }

	];

	constructor(private service: APIService, private dialogs: DialogsService, private data: DataserviceService, public dialog: MatDialog, private spinner: SpinnerService) {
		this.spinner.confirm(true);
		this.service.getAPI(APIConstants.RESOURCE_URL)
			.subscribe((resources) => {
				if (resources.length != 0) {
					this.resourceconfigs = resources;
					this.currentrc = this.resourceconfigs[0];
					this.currentvcenter = { ipaddress: resources[0].vcenter, username: resources[0].vcenteruser.split(':')[0], password: resources[0].vcenteruser.split(':')[1], mqttserver: resources[0].mqttserver };
					this.getVMs();
				}
			});
	}

	ngOnInit() {
		this.createTableRows();
		this.data.currentMessage.subscribe((message) => {
			this.message = message;
			this.dataSource.filter = this.message;
		});
	}

	ngOnChanges() {
		this.createTableRows();
	}

	getVMs() {
		const vmlistcv = [];
		if (this.currentvcenter != undefined) {
			this.currentvcenter = { ipaddress: this.currentrc.vcenter, username: this.currentrc.vcenteruser.split(':')[0], password: this.currentrc.vcenteruser.split(':')[1], mqttserver: this.currentrc.mqttserver };
			this.service.deployAPI(APIConstants.RETRIEVE_VMLIST, this.currentvcenter)
				.subscribe((vmlist) => {
					const obj = vmlist;
					Object.keys(obj).forEach((key) => {
						vmlistcv.push({ vmname: key, ipaddress: obj[key]['guest.ipAddress'], state: obj[key]['runtime.powerState'] });
						// this.createTableRows();
					});
					this.elements = vmlistcv;
					this.dataSource = new MatTableDataSource(this.elements);
					this.createTableRows();
					this.spinner.confirm(false);
				});
		} else {
			this.dataSource = new MatTableDataSource([]);
		}
	}

	applyFilter(filterValue) {
		this.data.changeMessage(filterValue);
	}

	onRefreshClick() {
		this.service.getAPI(APIConstants.RETRIEVE_VMS).subscribe((vmlist) => {
			this.elements = vmlist;
		});
	}

	resourceChange(event) {
		this.spinner.confirm(true);
		const vmlistcv = [];
		this.currentrc = event;
		this.service.deployAPI(APIConstants.RETRIEVE_VMLIST, { ipaddress: event.value.vcenter, username: event.value.vcenteruser.split(':')[0], password: event.value.vcenteruser.split(':')[1], mqttserver: event.value.mqttserver })
			.subscribe((vmlist) => {
				const obj = vmlist;
				Object.keys(obj).forEach((key) => {
					vmlistcv.push({ vmname: key, ipaddress: obj[key]['guest.ipAddress'], state: obj[key]['runtime.powerState'] });
					// this.createTableRows();
				});
				this.elements = vmlistcv;
				this.dataSource = new MatTableDataSource(this.elements);
				this.createTableRows();
				this.spinner.confirm(false);
			});
	}

	onUpgradeClick() {
		this.selectedLogs.splice(0, this.selectedLogs.length);
		this.dataSource.data.filter((row) => {
			if (this.selection.isSelected(row)) {
				this.selectedLogs.push(row.vmname);
			}

		});
		if (this.selectedLogs.length == 0 ) {
			this.dialogs.infoConfirm('Upgrade VM', 'Please select VMs to Upgrade', 'OK', 'info').subscribe((manage) => {
			});
		} else {
			this.service.select2API(APIConstants.RETRIEVELOADDETAILS, this.selectedLogs[0], this.currentrc.name)
			.subscribe(result => {
				const dialogRef = this.dialog.open(UpgradeVMComponent, {
					data: {
						vmnames: this.selectedLogs, initial: result, rc: this.currentrc
					}
				});
				dialogRef.afterClosed().subscribe(() => {
					this.getVMs();
				});
			});
		}
	}

	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.dataSource.data.length;
		return numSelected === numRows;
	}

	/** Selects all rows if they are not all selected; otherwise clear selection. */
	masterToggle() {
		this.isAllSelected() ?
			this.selection.clear() :
			this.dataSource.data.forEach(row => this.selection.select(row));
	}

	createTableRows() {
		this.displayedColumns = this.columns.map(x => x.columnDef);
		this.displayedColumns.push('View');
		this.displayedColumns[0] = 'select';
		this.dataSource = new MatTableDataSource(this.elements);
		this.selection = new SelectionModel<any>(true, []);
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
	}

	onViewClick(row) {
		const dialogRef = this.dialog.open(ChangeStateComponent, {
			data: {
				vmname: row.vmname, ipaddress: this.currentvcenter.ipaddress, state: row.state, username: this.currentvcenter.username, password: this.currentvcenter.password
			}
		});
		dialogRef.afterClosed().subscribe(() => {
			this.getVMs();
		});
	}
}

@Component({
	selector: 'v1830-changestate',
	templateUrl: './changestate.component.html'
})

export class ChangeStateComponent implements OnInit {
	elements: any[];
	vmlistcv: any[];
	currentvcenter: { ipaddress: any; username: any; password: any; mqttserver: any; };
	sendvalues: { vmname: any; ipaddress: string; username: string; password: string; currentAction: string; newAction: any; };
	deletemessage: string;
	changestateform: FormGroup;
	pagetitle = 'VM - State Change';
	vmstates: SelectOpion[] = [
		{ value: 'poweredOn', viewValue: 'POWERED ON' },
		{ value: 'poweredOff', viewValue: 'POWERED OFF' },
		{ value: 'destroy', viewValue: 'DESTROY' }
	];
	@ViewChild('scrollMe') private myScrollContainer: ElementRef;
	title: any;
	logdata: any;
	selection: SelectionModel<any>;
	dataSource: MatTableDataSource<any>;
	constructor(public dialogRef: MatDialogRef<ChangeStateComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private service: APIService, public dialog: MatDialog, private spinner: SpinnerService, private dialogs: DialogsService) {
		this.changestateform = new FormGroup({
			vmname: new FormControl(''),
			ipaddress: new FormControl(''),
			vmstate: new FormControl('')
		});
		this.changestateform.controls['vmname'].setValue(this.data.vmname);
		this.changestateform.controls['ipaddress'].setValue(this.data.ipaddress);
		this.changestateform.controls['vmstate'].setValue(this.data.state);
	}

	ngOnInit() {
		this.changestateform.controls['vmname'].disable();
		this.changestateform.controls['ipaddress'].disable();
	}

	close() {
		this.dialogRef.close();

	}

	isAllSelected() {
		const numSelected = this.selection.selected.length;
	}

	onstateChangeClick() {
		let action = 'destroy';
		if (this.changestateform.controls['vmstate'].value == 'poweredOn') {
			action = 'on';
		} else if (this.changestateform.controls['vmstate'].value == 'poweredOff') {
			action = 'off';
		}
		if (action == 'destroy') {
			this.deletemessage = 'Are you sure you want to Destroy the ' + this.changestateform.controls['vmname'].value + ' VM';
			this.dialogRef.close();
			this.dialogs.confirm('VM State Change', this.deletemessage, 'Destroy').subscribe((res) => {
				if (res) {
				}
			});
		} else {
			this.doStateChange(action);
		}
	}

	doStateChange(action) {
		this.spinner.confirm(true);
		this.sendvalues = { vmname: this.changestateform.controls['vmname'].value, ipaddress: this.data.ipaddress, username: this.data.username, password: this.data.password, currentAction: this.data.state, newAction: action };
		this.service.postAPI(APIConstants.SETVMSTATE, this.sendvalues)
			.subscribe((result) => {
				this.dialogRef.close();
			});
	}

	onCancelClick() {
		this.dialogRef.close();
	}
}

@Component({
	selector: 'v1830-upgradevm',
	templateUrl: './upgradevm.component.html'
})

export class UpgradeVMComponent {
	upgradevmform: FormGroup;
	pagetitle = 'Upgrade VM';
	runlevels: SelectOpion[] = [
		{ value: 'stop', viewValue: 'STOP' },
		{ value: 'start', viewValue: 'START' },
		{ value: 'commission', viewValue: 'COMMISSION' }
	];
	@ViewChild('scrollMe') private myScrollContainer: ElementRef;
	title: any;
	logdata: any;
	selection: SelectionModel<any>;
	dataSource: MatTableDataSource<any>;
	constructor(public dialogRef: MatDialogRef<UpgradeVMComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private service: APIService, public dialog: MatDialog, private spinner: SpinnerService, private dialogs: DialogsService) {
		this.upgradevmform = new FormGroup({
			vmname: new FormControl(''),
			neloadurl: new FormControl(''),
			neload: new FormControl(''),
			gmreloadurl: new FormControl(''),
			gmreload: new FormControl(''),
			oarloadurl: new FormControl(''),
			oarload: new FormControl(''),
			runlevel: new FormControl('')
		});
	}

	onCancelClick() {
		this.dialogRef.close();
	}

	onupgradeClick() {
		this.service.postAPI(APIConstants.UPGRADEVM + this.data.rc + this.data.vmname, this.upgradevmform.getRawValue())
		.subscribe((result) => {
		});
	}

}

