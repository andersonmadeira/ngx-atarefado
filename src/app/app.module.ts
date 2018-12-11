import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BoardComponent } from 'app/components';
import { AppComponent } from './app.component';
import { MaterialModule } from './modules';
import { TaskSortPipe } from './pipes';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    TaskSortPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
  ],
  exports: [
    TaskSortPipe,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
