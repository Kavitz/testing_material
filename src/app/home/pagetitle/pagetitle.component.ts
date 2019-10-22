import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, OnChanges } from '@angular/core';
import { DataserviceService } from '../../services/dataservice.service';

@Component({
	selector: 'v1830-pagetitle',
	templateUrl: './pagetitle.component.html',
	styleUrls: ['./pagetitle.component.css']
})
export class PagetitleComponent implements OnInit, OnChanges {
	@Input() pagetitle: String = '';
	@Input() refreshbtn: boolean;
	@Input() addbtn: boolean;
	@Input() upgrade: boolean;
	@Input() searchbtn: boolean;
	@Input() resourceconfigs: any[];
	@Output() RefreshClickFromPageHeader = new EventEmitter();
	@Output() AddClickFromPageHeader = new EventEmitter();
	@Output() UpgradeClickFromPageHeader = new EventEmitter();
	@Output() ResourceChangeFromPageHeader = new EventEmitter<object>();
	userrole: string = '';
	message: any;
	currentrc: any = '';

	constructor(private data: DataserviceService) {
		const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        if (currentUser) {
            this.userrole = currentUser.userrole;
		}
	}

	ngOnInit() {
		this.data.currentMessage.subscribe(message => this.message = message);
	}

	ngOnChanges() {
		if (this.currentrc == '' && this.resourceconfigs != undefined) {
			this.currentrc = this.resourceconfigs[0];
		}
	}

	onAddclick(event) {
		this.AddClickFromPageHeader.emit();
	}

	onRefreshClick() {
		this.RefreshClickFromPageHeader.emit();
	}

	onResourceChange($event) {
		this.ResourceChangeFromPageHeader.emit($event);
	}

	onUpgradeClick() {
		this.UpgradeClickFromPageHeader.emit();
	}

	applyFilter(filterValue) {
		this.data.changeMessage(filterValue);
	}

}
