import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageusersComponent } from './manageusers.component';
import { Routes, RouterModule } from '@angular/router';
import { PagetitleModule } from '../pagetitle/pagetitle.module';
import { MatButtonModule, MatCardModule, MatButtonToggleModule, MatDialogModule, MatIconModule, MatInputModule, MatNativeDateModule, MatToolbarModule, MatTooltipModule, MatFormFieldModule } from '@angular/material';
import { TableModule } from '../table/table.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { UserpreferenceComponent } from './userpreference.component';
const routes: Routes = [
  {path: '', component: ManageusersComponent}
]; 

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatSelectModule,
    MatTooltipModule,
    MatFormFieldModule,
    TableModule,
    PagetitleModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ManageusersComponent, UserpreferenceComponent]
})
export class UsersModule { }
