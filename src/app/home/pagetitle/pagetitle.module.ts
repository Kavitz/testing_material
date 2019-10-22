import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagetitleComponent } from './pagetitle.component';
import { MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  declarations: [PagetitleComponent],
  exports: [PagetitleComponent]
})
export class PagetitleModule { }
