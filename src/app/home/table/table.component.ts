import { Component, OnInit, ViewChild, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DataserviceService } from '../../services/dataservice.service';

@Component({
	selector: 'v1830-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges {
	@Input() columns: any[] = [];
	@Input() elements = [];
	@Input() simbuilder: boolean;
	@Output() editClickFromTable = new EventEmitter<string>();
	@Output() disableClickFromTable = new EventEmitter<object>();
	@Output() deleteClickFromTable = new EventEmitter<string>();
	@Output() deployClickFromTable = new EventEmitter<string>();

	dataSource: MatTableDataSource<any>;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	displayedColumns: string[];
	message: any;
	userrole: string = '';
	constructor(private data: DataserviceService) {
		const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        if (currentUser) {
            this.userrole = currentUser.userrole;
        }
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

	createTableRows() {
		this.displayedColumns = this.columns.map(x => x.columnDef);
		if (this.userrole != 'standard') {
			this.displayedColumns.push('Edit/Delete');
		}
		this.dataSource = new MatTableDataSource(this.elements);
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
	}

	getCheckVaue(val: any): boolean {
		if (val == true || val == 1 || val == 'true') {
			return false;
		} else {
			return true;
		}
	}

	onDisableClick(checked, row) {
		this.disableClickFromTable.emit({name: row.name, disableRC: !checked});
	}

	onEditClick(row) {
		this.editClickFromTable.emit(row);
	}

	onDeleteClick(row) {
		this.deleteClickFromTable.emit(row);
	}

	onDeploy(row) {
		this.deployClickFromTable.emit(row);
	}
}


