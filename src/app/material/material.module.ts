import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Material from '@angular/material';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Material.MatToolbarModule,
    Material.MatGridListModule,
    Material.MatInputModule,
    Material.MatFormFieldModule,
    Material.MatRadioModule,
    Material.MatButtonModule,
    Material.MatSnackBarModule,
    Material.MatCardModule,
    Material.MatMenuModule,
    Material.MatGridListModule,
  ],
  exports: [
    Material.MatGridListModule,
    Material.MatMenuModule,
    Material.MatCardModule,
    Material.MatSnackBarModule,
    Material.MatButtonModule,
    Material.MatRadioModule,
    Material.MatToolbarModule,
    Material.MatGridListModule,
    Material.MatInputModule,
    Material.MatFormFieldModule,
  ],
  providers: [{provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 1000}}]
})
export class MaterialModule { }
