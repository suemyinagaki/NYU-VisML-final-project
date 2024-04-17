
// core
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// components
import { AppComponent } from './app.component';
import {Component} from '@angular/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { QueryParametersComponent } from './views/query-parameters/query-parameters.component';
// import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
  ],
  exports: [],
  imports: [
    // HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    Component,
    MatButtonToggleModule,
    QueryParametersComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
