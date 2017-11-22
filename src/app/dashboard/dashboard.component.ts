import {  Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {MatButtonModule, MatCheckboxModule, MatTabsModule} from '@angular/material';

@Component({
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {

  public pieChartOptions:any = {
    legend: { display: false },
    tooltips: { enabled: false, zeroLineWidth: 0 }
  };

public pieChartLabels:string[] = [];
public pieChartData:number[] = [50, 500, 100, 300];
public pieChartData2:number[] = [100, 150, 300, 50];
public pieChartData3:number[] = [250, 30, 600, 100];
public pieChartData4:number[] = [350, 100, 50, 250];
public pieChartData5:number[] = [50, 500, 100, 300];
public pieChartType:string = 'pie';

public pieChartColors:Array<any> = [{ backgroundColor: ["#124291", "#05a18f", "#ffe093", "#d2302f"] }];

// events
public chartClicked(e:any):void {
  console.log(e);
}

public chartHovered(e:any):void {
  console.log(e);
}

// Bar chart
public barChartOptions:any = {
    scaleShowVerticalLines: false,
    legend: { display: false },
    responsive: true
  };
  public barChartLabels:string[] = ['Apple', 'Samsung', 'Nokia', 'LG'];
  public barChartType:string = 'horizontalBar';
  public barChartLegend:boolean = true;
 
  public barChartData:any[] = [
    {data: [65, 59, 80, 81], label: ''}
    //{data: [28, 48, 40, 19], label: 'Series B'}
  ];
 
  public barChartColors:Array<any> = [{ backgroundColor: "#124291" }];

  public randomize():void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
  }

}

