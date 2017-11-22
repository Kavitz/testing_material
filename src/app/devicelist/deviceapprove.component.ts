import {  Component, ViewChild, ElementRef, AfterViewInit, Inject } from '@angular/core';
import { NgModel } from '@angular/forms';
//import {MatButtonModule, MatCheckboxModule, MatTabsModule, MatSelectModule, MatExpansionModule} from '@angular/material';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'device-approve',
    templateUrl: 'deviceapprove.component.html',
    styleUrls: ['./deviceview.component.css']
}) 


export class DeviceApproveComponent {

    private showHide: false;
    private showHide1: false;
    private showHide2: false;
    private showHide3: false;

    private panelOpenState: boolean = false;
    
    foods = [
        {value: 'steak-0', viewValue: 'Test1'},
        {value: 'pizza-1', viewValue: 'Test2'},
        {value: 'tacos-2', viewValue: 'Test3'}
      ];
      

}


