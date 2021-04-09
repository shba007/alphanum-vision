import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Directive({
  selector: '[baseChart]',
})
export class BaseChartDirective implements OnInit {
  @Input() chartType;
  @Input() labels;
  @Input() options;

  private _datasets;
  @Input() set datasets(value) {
    this._datasets = value;

    if (!!this.chart) {
      this.chart.data.datasets = value;
      this.chart.update();
    }
  }
  get datasets() {
    return this._datasets;
  }

  public ctx: CanvasRenderingContext2D;
  public chart: Chart;

  constructor(private elRef: ElementRef) {}
  ngOnInit() {
    this.ctx = this.elRef.nativeElement.getContext('2d');
    Chart.register(...registerables);

    this.chart = new Chart(this.ctx, {
      type: this.chartType,
      data: {
        labels: this.labels,
        datasets: this.datasets,
      },
      options: this.options,
    });
  }
}
