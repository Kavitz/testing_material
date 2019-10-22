import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { APIService } from '../../../services/apiservice.service';
import { APIConstants } from '../../../services/constants';
import { DialogsService } from '../../dialogs/dialogs.service';
import { DataserviceService } from '../../../services/dataservice.service';
import { Router, NavigationEnd } from '@angular/router';
import { SpinnerService } from '../../spinner/spinner.service';
import { FormControl } from '@angular/forms';
export interface Deployment {
	vmname: string;
	username: string;
	status: string;
	starttime: string;
	endtime: string;
}
export interface DialogData {
	title: string;
	logdata: string;
}
@Component({
	selector: 'v1830-logs-main',
	templateUrl: './logs-main.component.html',
	styleUrls: ['./logs-main.component.css']
})
export class LogsMainComponent implements OnInit, AfterViewInit, OnDestroy {
	elements: any;
	logMessage: any;
	title;
	simbuilderlog = false;
	pagetitle: any;
	href: string = '';
	currentUrl: string;
	currentfilename;
	autoRefresh: any;
	autorefreshlog = true;
	autorefreshtable: any;
	autorefreshlogtable = false;
	ifautorefreshlogtable = false;
	ifautorefreshlog = true;
	simbuliderdelete = true;
	togglerefresh = true;
	selectedRowIndex = -1;
	deletebtn = true;
	hrvalue = true;
	simbuilderlogmsg;
	message: string;
	animal: string;
	name: string;
	displayedColumns: string[] = ['filename'];
	columns: { columnDef: string; header: string; width: string; dispcolumn: boolean; cell: (element: any) => string; }[] = [
		{ columnDef: 'seelect', header: 'Select', width: '5%', dispcolumn: false, cell: (element: any) => `${''}` },
		{ columnDef: 'vname', header: 'VM Name', width: '20%', dispcolumn: false, cell: (element: any) => `${element.vmname}` },
		{ columnDef: 'username', header: 'User Name', width: '10%', dispcolumn: false, cell: (element: any) => `${element.username}` },
		{ columnDef: 'status', header: 'Status', width: '10%', dispcolumn: false, cell: (element: any) => `${element.status}` },
		{ columnDef: 'starttime', header: 'Start Time', width: '20%', dispcolumn: false, cell: (element: any) => `${element.starttime}` },
		{ columnDef: 'endtime', header: 'End time', width: '20%', dispcolumn: false, cell: (element: any) => `${element.endtime}` }

	];

	constructor(private service: APIService, private dialogs: DialogsService, private data: DataserviceService, public dialog: MatDialog,
		private router: Router, private spinner: SpinnerService) {
		this.simbuilderlogmsg = new FormControl();
		this.simbuilderlogmsg = '';

	}

	ngOnInit() {
		this.getLog();
	}

	ngAfterViewInit() {
		if (this.autorefreshlogtable) {
			this.autorefreshtable = setInterval(() => {
				this.getLog();
			}, 30000);
		}
	}

	selectRow(row) {
		this.selectedRowIndex = row.filename;
		this.currentfilename = row.filename;
		this.simbuliderdelete = false;
		this.spinner.confirm(true);
		this.service.selectLogAPI(APIConstants.RETRIEVE_SIMBUILDERLOGDATA, row.filename).subscribe((logdata) => {
			this.simbuilderlogmsg = logdata;
			this.spinner.confirm(false);
		});
	}

	getLog() {
		if (this.router.url.indexOf('deployment') != -1) {
			this.service.getAPI(APIConstants.RETRIEVE_VMS).subscribe((vmlist) => {
				this.elements = vmlist;
				this.pagetitle = 'Deployment Log';
				this.simbuilderlog = false;
				this.spinner.confirm(false);
			});
		} else if (this.router.url.indexOf('upgrade') != -1) {

			this.service.getAPI(APIConstants.RETRIEVE_UPGRADE).subscribe((vmlist) => {
				this.elements = vmlist;
				this.pagetitle = 'Upgrade Log';
				this.simbuilderlog = false;
				this.spinner.confirm(false);
			});
		} else if (this.router.url.indexOf('simbuilder') != -1) {
			this.service.getAPI(APIConstants.RETRIEVE_SIMBUILDERLOG).subscribe((simlist) => {
				this.elements = simlist;
				this.pagetitle = 'Simbuilder Log';
				this.simbuilderlog = true;
				this.spinner.confirm(false);
			});

		}
	}

	getLogData(API, row) {
		this.title = row.vmname;
		this.service.selectLogAPI(API, row.vmname).subscribe((log) => {
			this.logMessage = log;
			if (log) {
				const dialogRef = this.dialog.open(LogdataviewComponent, {
					disableClose: true,
					data: { title: row.vmname, logdata: this.logMessage },
				});
				dialogRef.afterClosed().subscribe(result => {
					this.autorefreshlog = false;
					clearInterval(this.autoRefresh);
				});
			} else {
				const dialogRef = this.dialog.open(LogdataviewComponent, {
					disableClose: true,
					data: { title: row.vmname, logdata: 'No log data found' }
				});
				dialogRef.afterClosed().subscribe(result => {
					this.autorefreshlog = false;
					clearInterval(this.autoRefresh);
				});
			}
		});
	}

	onView(row) {
		if (this.router.url.indexOf('deployment') != -1) {
			this.getLogData(APIConstants.RETRIEVE_LOGS, row);
		} else if (this.router.url.indexOf('upgrade') != -1) {
			this.getLogData(APIConstants.RETRIEVE_UPGRADELOG, row);

		}
	}

	deleteMultiple(API, row) {
		this.service.deletelogAPI(API, row)
			.subscribe((logmsg) => {
				this.getLog();
				if (logmsg.affectedRows === 1) {
					this.getLog();
				}
			}, (err) => {
			});
	}

	onDeleteMutiple(row: string) {
		if (this.router.url.indexOf('deployment') != -1) {
			this.deleteMultiple(APIConstants.DELETE_DEPLOYMENTLOG, row);
		} else if (this.router.url.indexOf('upgrade') != -1) {
			this.deleteMultiple(APIConstants.DELETEUPGRADELOGS, row);
		} else if (this.router.url.indexOf('simbuilder') != -1) {

		}
	}

	delete(API, row) {
		this.dialogs.confirm('Delete Log', 'Are you sure you want to delete selected logs ?', 'Delete').subscribe((res) => {
			if (res) {
				this.service.deletelogAPI(API, row)
					.subscribe((logmsg) => {
						this.getLog();
						if (logmsg.affectedRows === 1) {
							this.getLog();
						}
					}, (err) => {
					});
			}
		});
	}

	onDelete(row: string) {
		if (this.router.url.indexOf('deployment') != -1) {
			this.delete(APIConstants.DELETE_DEPLOYMENTLOG, row);
		} else if (this.router.url.indexOf('upgrade') != -1) {
			this.delete(APIConstants.DELETEUPGRADELOGS, row);
		} else if (this.router.url.indexOf('simbuilder') != -1) {
			this.delete(APIConstants.DELETE_SIMBUILDERLOG, this.currentfilename);
		}
	}

	ngOnDestroy() {
		if (this.autorefreshtable) {
			clearInterval(this.autorefreshtable);
		}
	}

	closeLogWindow() {
		if (this.autoRefresh) {
			clearInterval(this.autoRefresh);
		}
	}

	toggelautorefreshTable(check) {
		if (check) {
			this.autorefreshtable = setInterval(() => {
				this.getLog();
			}, 30000);
		} else {
			clearInterval(this.autorefreshtable);
		}
	}

	onRefreshClick() {
		this.simbuilderlogmsg = '';
		this.selectedRowIndex = -1;
		this.simbuliderdelete = true;
		this.getLog();
	}
}

@Component({
	selector: 'v1830-logdataview',
	templateUrl: './logdataview.component.html'
})
export class LogdataviewComponent implements AfterViewInit, OnDestroy {
	autoRefresh: any;
	autorefreshlog = true;
	autorefreshtable: any;
	autorefreshlogtable = false;
	ifautorefreshlogtable = false;
	ifautorefreshlog = true;
	autoscrolllog = true;
	@ViewChild('scrollMe') myScrollContainer: ElementRef;
	title: any;
	logdata: any;
	constructor(public dialogRef: MatDialogRef<LogdataviewComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private obj: LogsMainComponent, private service: APIService) { }
	ngAfterViewInit() {
		if (this.autorefreshlog) {
			this.check(this.data.title);
		}
	}
	close() {
		this.dialogRef.close();
		clearInterval(this.autoRefresh);
	}
	onNoClick(): void {
		this.dialogRef.close();
		clearInterval(this.autoRefresh);
	}
	ngOnDestroy() {
		if (this.autorefreshlog) {
			clearInterval(this.autorefreshtable);
		}
	}
	check(value) {
		this.dialogRef.afterClosed().subscribe(result => {
			this.autorefreshlog = false;
			clearInterval(this.autoRefresh);
		});
		this.autoRefresh = setInterval(() => {
			if (this.autorefreshlog) {
				this.refreshlogs(value);
			} else {
				clearInterval(this.autoRefresh);
			}
		}, 15000);
	}
	closeLogWindow() {
		if (this.autoRefresh) {
			clearInterval(this.autoRefresh);
		}
	}
	change(autorefreshlog, value) {
		if (this.autorefreshlog) {
			this.ifautorefreshlog = true;
			this.autoRefresh = setInterval(() => {
				this.refreshlogs(value);
			}, 15000);
		} else {

			this.ifautorefreshlog = false;
			clearInterval(this.autoRefresh);
			this.closeLogWindow();
		}
	}

	refreshlogs(value) {
		this.title = value;
		if (this.autorefreshlog) {
			this.service.selectLogAPI(APIConstants.RETRIEVE_LOGS, value).subscribe((log) => {
				if (log) {
					this.data.logdata = log;
					if (this.autoscrolllog) {
						this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
					} else {
						this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.this.myScrollContainer.nativeElement.scrollTop;
					}
				} else {
					this.data.logdata = 'no log is found after refresh';
				}

			});
		}
	}

	refresh(value) {
		this.service.selectLogAPI(APIConstants.RETRIEVE_LOGS, value).subscribe((log) => {
			if (log) {
				this.data.logdata = log;
			} else {
				this.data.logdata = 'No log data found.';
			}
		});
	}

}

