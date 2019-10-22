import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VirtualmachineComponent, ChangeStateComponent, UpgradeVMComponent } from './virtualmachine.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
// tslint:disable-next-line:import-destructuring-spacing
import {MatSelectModule} from '@angular/material/select';
import { MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatIconModule,
  MatListModule,
  MatInputModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSidenavModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule,
  MatFormFieldModule,
  MatPaginatorModule
  } from '@angular/material';

import { TableModule } from '../table/table.module';
import { PagetitleModule } from '../pagetitle/pagetitle.module';
const routes: Routes = [
  {path: '', component: VirtualmachineComponent}
];
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatRadioModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    PagetitleModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    RouterModule.forChild(routes),
  ],
  declarations: [VirtualmachineComponent],
  providers: []
})
export class VirtualmachineModule { }
