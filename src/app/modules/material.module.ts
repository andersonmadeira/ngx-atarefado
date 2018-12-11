import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatIconModule, MatGridListModule, MatFormFieldModule, MatInputModule,
  MatSelectModule, MatOptionModule, MatTooltipModule, MatDialogModule, MatCardModule, MatListModule,
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatTooltipModule,
    MatDialogModule,
    MatCardModule,
    MatListModule,
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatTooltipModule,
    MatDialogModule,
    MatCardModule,
    MatListModule,
  ],
  providers: [
      // any?
  ]
})
export class MaterialModule { }
