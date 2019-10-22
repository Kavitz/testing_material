import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { MatTableModule, MatSortModule, MatPaginatorModule, MatButtonModule, MatCheckbox, MatCheckboxModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatSortModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatButtonModule,
    FormsModule
  ],
  declarations: [TableComponent],
  exports: [TableComponent]
})
export class TableModule { }
