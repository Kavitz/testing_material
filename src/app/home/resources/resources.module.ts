import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainResourcesComponent } from './main-resources.component';
import { Routes, RouterModule } from '@angular/router';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatButtonModule, MatSelectModule, MatTooltipModule, MatToolbarModule, MatNativeDateModule, MatIconModule, MatButtonToggleModule, MatCheckboxModule, MatDividerModule, MatAutocompleteModule, MatInputModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { PagetitleModule } from '../pagetitle/pagetitle.module';
import { TableModule } from '../table/table.module';
import { MatDialogModule } from '@angular/material/dialog';
import { EditresourceComponent } from './editresource.component';
import { AddResourcesComponent } from './addresource.component';
const routes: Routes = [
  {path: '', component: MainResourcesComponent}
];
@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatStepperModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatCheckboxModule,
    TableModule,
    PagetitleModule,
    FormsModule,
    MatSelectModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatDividerModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MainResourcesComponent, AddResourcesComponent, EditresourceComponent ],
  entryComponents: [ AddResourcesComponent, EditresourceComponent ],
  providers: [ MainResourcesComponent ]
})
export class ResourcesModule { }
