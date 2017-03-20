import { Component, EventEmitter, Input, Output, OnChanges, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';

import { StatsService } from '../stats.service';
import { BarChart, LineChart, Chart, ChartData, ChartOptions } from '../model/chartModel';

@Component({
  selector: 'app-stats-result',
  templateUrl: './stats-result.component.html'
})
export class StatsResultComponent implements OnInit, OnChanges {
  @Input() chart: Chart;
  @Input() stack: boolean;

  @Output() before = new EventEmitter();
  @Output() success = new EventEmitter();
  @Output() error = new EventEmitter();

  chartTypes: Object = {
    line: '꺾은선형',
    bar: '세로 막대형'
  };

  _stacked: boolean;

  constructor(private statsService: StatsService) { }

  ngOnInit() {
    this.initOptions();
    this.stacked = this.stack;
  }

  ngOnChanges() {
    this.initOptions();
  }

  onSubmit() {
    this.before.emit();
    this.statsService.queryChart(this.chart.data)
      .then(blob => saveAs(blob, `UCDS_차트 데이터.xlsx`))
      .then(() => this.success.emit())
      .catch(() => this.error.emit());
  }

  get stacked() {
    return this._stacked;
  }

  set stacked(value: boolean) {
    this._stacked = value;
    this.chart.options.scales.xAxes[0].stacked = value;
    this.chart.options.scales.yAxes[0].stacked = value;
    this.updateChart();
  }

  get min(): number {
    return this.chart.options.scales.yAxes[0].ticks.suggestedMin;
  }

  set min(value: number) {
    this.chart.options.scales.yAxes[0].ticks.suggestedMin = value;
    this.updateChart();
  }

  get max(): number {
    return this.chart.options.scales.yAxes[0].ticks.suggestedMax;
  }

  set max(value: number) {
    this.chart.options.scales.yAxes[0].ticks.suggestedMax = value;
    this.updateChart();
  }

  private initOptions() {
    this.chart.options = {
      scales: {
          xAxes: [{
            stacked: undefined
          }],
          yAxes: [{
            stacked: undefined,
            ticks: {
              suggestedMin: undefined,
              suggestedMax: undefined
            }
          }]
      }
    };
  }

  private updateChart() {
    this.chart.options = Object.assign({}, this.chart.options);
  }
}
