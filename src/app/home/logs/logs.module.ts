import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogsMainComponent, LogdataviewComponent } from './logs-main/logs-main.component';
import { MatTabsModule, MatDialogModule, MatSlideToggleModule, MatIconModule, MatInputModule, MatTableModule, MatTooltipModule, MatButtonModule } from '@angular/material';
import { LogstablestructureModule } from './logstablestructure/logstablestructure.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { LogsUpgradeComponent, LogsupgradeviewComponent } from './logs-upgrade/logs-upgrade.component';

const routes: Routes = [
  { path: '', component: LogsMainComponent }
];

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    LogstablestructureModule,
    MatDialogModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    HttpClientModule,
    MatInputModule,
    MatTableModule,
    RouterModule.forChild(routes),
    MatIconModule,
    MatButtonModule
  ],
  declarations: [LogdataviewComponent, LogsMainComponent, LogsUpgradeComponent, LogsupgradeviewComponent],
  entryComponents: [LogdataviewComponent, LogsupgradeviewComponent],
  providers: [LogsMainComponent, LogsUpgradeComponent]
})
export class LogsModule { }
