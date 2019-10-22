import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { MatCardModule } from '@angular/material/card';
import { PagetitleModule } from './pagetitle/pagetitle.module';
//import { EditorModule } from 'primeng/editor';
import { MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatListModule,
  MatInputModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatProgressBarModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
  MatFormFieldModule

  } from '@angular/material';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { DialogsService } from './dialogs/dialogs.service';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { UserprofileComponent } from './userprofile/userprofile.component';

import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { AdminpreferenceComponent } from './adminpreference/adminpreference.component';
import { AuthGuard } from '../auth.guard';
import { SpinnerDialogComponent } from './spinner/spinner-dialog/spinner-dialog.component';
import { MultideployComponent } from './simplevm/simpevm.component';
import { UpgradeVMComponent, ChangeStateComponent } from './virtualmachine/virtualmachine.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent,
  children : [
    { path: '', redirectTo: 'simplevm', pathMatch: 'prefix' },
    { path: 'vcenter', loadChildren: './vcenter/vcenter.module#VcenterModule', canActivate: [AuthGuard] },
    { path: 'ovf', loadChildren: './ovf/ovf.module#OvfModule', canActivate: [AuthGuard]},
    { path: 'simplevm', loadChildren: './simplevm/simplevm.module#SimplevmModule', canActivate: [AuthGuard]},
    { path: 'resources', loadChildren: './resources/resources.module#ResourcesModule', canActivate: [AuthGuard]},
    { path: 'logs/deployment', loadChildren: './logs/logs.module#LogsModule', canActivate: [AuthGuard]},
    { path: 'logs/upgrade', loadChildren: './logs/logs.module#LogsModule', canActivate: [AuthGuard]},
    { path: 'logs/simbuilder', loadChildren: './logs/logs.module#LogsModule', canActivate: [AuthGuard]},
    { path: 'manageusers', loadChildren: './users/users.module#UsersModule', canActivate: [AuthGuard]},
    { path: 'managegroups', loadChildren: './groups/groups.module#GroupsModule', canActivate: [AuthGuard]},
    { path: 'simbuilder', loadChildren: './simbuilder/simbuilder.module#SimbuilderModule', canActivate: [AuthGuard]},
    { path: 'virtualmachine', loadChildren: './virtualmachine/virtualmachine.module#VirtualmachineModule', canActivate: [AuthGuard] },
    { path: 'userprofile', component: UserprofileComponent, canActivate: [AuthGuard]},
    { path: 'changepassword', component: ChangepasswordComponent, canActivate: [AuthGuard]},
    { path: 'userpreference', component: AdminpreferenceComponent, canActivate: [AuthGuard]}
  ]
}
];

@NgModule({
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    PagetitleModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatCardModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    MatFormFieldModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    MatSortModule,
  //  EditorModule,
   // EditorModule,
    MDBBootstrapModule.forRoot()
  ],
  declarations: [HomeComponent, MenuComponent, ConfirmDialogComponent, UserprofileComponent, ChangepasswordComponent, AdminpreferenceComponent, SpinnerDialogComponent, MultideployComponent, ChangeStateComponent, UpgradeVMComponent ],
  entryComponents: [ConfirmDialogComponent, SpinnerDialogComponent, MultideployComponent, ChangeStateComponent, UpgradeVMComponent],
  providers: [DialogsService]
})
export class HomeModule { }
