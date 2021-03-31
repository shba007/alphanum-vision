import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';

import { DrawableDirective } from './drawable.directive';

@NgModule({
  declarations: [AppComponent, ChartComponent, DrawableDirective],
  imports: [BrowserModule, HttpClientModule, ChartsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
