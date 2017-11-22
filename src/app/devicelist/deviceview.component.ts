import {  Component, ViewChild, ElementRef, AfterViewInit, Inject } from '@angular/core';
import { NgModel } from '@angular/forms';
import {MatButtonModule, MatCheckboxModule, MatTabsModule, MatSelectModule} from '@angular/material';

import { FormsModule } from '@angular/forms';
//import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatButtonModule, MatCheckboxModule, MatTabsModule} from '@angular/material';
//import {MatDialogModule} from '@angular/material/dialog';

@Component({
    selector: 'device-view',
    templateUrl: 'deviceview.component.html',
    styleUrls: ['./deviceview.component.css']
}) 


export class DeviceViewComponent {

    private showHide: false;
    private showHide1: false;
    private showHide2: false;
    private showHide3: false;
    
    foods = [
        {value: 'steak-0', viewValue: 'Test1'},
        {value: 'pizza-1', viewValue: 'Test2'},
        {value: 'tacos-2', viewValue: 'Test3'}
      ];

}

