import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { LoaderComponent } from './loader/loader.component';

import { DrawableDirective } from './drawable.directive';
import { BaseChartDirective } from './chart/base-chart.directive';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    LoaderComponent,
    DrawableDirective,
    BaseChartDirective,
  ],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
