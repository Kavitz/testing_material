import { Component, OnInit, Input, ViewChild, OnChanges, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { DataserviceService } from '../../../services/dataservice.service';
import { SelectionModel } from '@angular/cdk/collections';
import { DialogsService } from '../../dialogs/dialogs.service';
import { T } from '@angular/core/src/render3';

@Component({
	selector: 'v1830-logstablestructure',
	templateUrl: './logstablestructure.component.html',
	styleUrls: ['./logstablestructure.component.css']
})
export class LogstablestructureComponent implements OnInit, OnChanges {
	@Input() columns: any[] = [];
	@Input() elements = [];
	@Input() pagetitle: string;
	selectedLogs: Array<string> = [];
	value: any;
	hrvalue = false;
	deletebtn = true;
	dataSource: MatTableDataSource<any>;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@Output() viewClickFromlog = new EventEmitter<string>();
	@Output() deleteFromlog = new EventEmitter<string[]>();
	@Output() deletemultipleFromlog = new EventEmitter<string[]>();
	@Output() togglerefresh = new EventEmitter();
	@ViewChild(MatSort) sort: MatSort;
	autorefreshlogtable = false;
	ifautorefreshlogtable = false;
	displayedColumns: string[];
	message: any;
	selection: SelectionModel<any>;

	constructor(private data: DataserviceService, private dialogs: DialogsService) { }

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

	/** Whether the number of selected elements matches the total number of rows. */

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

	onViewClick(row) {
		this.viewClickFromlog.emit(row);
	}

	onDeleteClick(selected) {
		if (!selected) {
			this.dialogs.infoConfirm('Delete Log', 'Please select logs to be delete', 'OK', 'info').subscribe((manage) => {
			});
		} else {
			this.selectedLogs.splice(0, this.selectedLogs.length);
			this.dataSource.data.filter((row) => {
				if (this.selection.isSelected(row)) {
					this.selectedLogs.push(row.vmname);
				}

			});
			this.dialogs.confirm('Delete Log', 'Are you sure you want to delete selected logs ?', 'Delete').subscribe((res) => {
				if (res) {
					this.deletemultipleFromlog.emit(this.selectedLogs);
				} else {
					this.selection.clear();
				}
			});
		}
	}

	onclear() {
		this.selection.clear();
	}

	createTableRows() {
		this.pagetitle = this.pagetitle;
		this.displayedColumns = this.columns.map(x => x.columnDef);
		this.displayedColumns.push('View');
		this.displayedColumns[0] = 'select';
		this.dataSource = new MatTableDataSource(this.elements);
		this.selection = new SelectionModel<any>(true, []);
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
	}

	updateChecked(option, event) {
	}

	toggelautorefreshTable() {
		if (this.autorefreshlogtable) {
			this.ifautorefreshlogtable = true;
			this.togglerefresh.emit(true);
		} else {
			this.ifautorefreshlogtable = false;
			this.togglerefresh.emit(false);
		}
	}

	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}
}


