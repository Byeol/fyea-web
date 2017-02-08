import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { StatsService } from '../stats.service';
import { BarChart, LineChart, Chart, ChartData } from '../model/chartModel';

@Component({
  selector: 'app-stats-result',
  templateUrl: './stats-result.component.html'
})
export class StatsResultComponent implements OnInit {
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
    this.stacked = this.stack;
  }

  onSubmit() {
    this.before.emit();
    this.statsService.queryChart(this.chart.data)
      .then(() => this.success.emit())
      .catch(() => this.error.emit());
  }

  get stacked() {
    return this._stacked;
  }

  set stacked(value: boolean) {
    this._stacked = value;
    this.chart.options = {
      scales: {
          xAxes: [{
              stacked: value
          }],
          yAxes: [{
              stacked: value,
              ticks: {
                max: value ? 100 : undefined
              }
          }]
      }
    };
  }
}
