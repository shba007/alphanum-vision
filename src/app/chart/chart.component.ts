import { Component, Input, OnChanges } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnChanges {
  @Input() data;

  public barChartType: ChartType = 'bar';
  public barChartLabels = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  public barChartData: ChartDataset[] = [
    {
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      label: 'Predictions',
      backgroundColor: '#4c6ef5',
    },
  ];
  public barChartOptions: ChartOptions = {
    responsive: true,
    backgroundColor: '#4c6ef5',
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          font: {
            size: 20,
            family: 'Poppins',
          },
        },
      },
      y: {
        display: true,
        suggestedMin: 0,
        suggestedMax: 100,
        grid: { display: true },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  ngOnChanges() {
    this.barChartData = [
      {
        data: this.data || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        label: 'Predictions',
        backgroundColor: '#4c6ef5',
      },
    ];
  }
}
