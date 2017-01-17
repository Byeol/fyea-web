import { Component, EventEmitter, Input, Output } from '@angular/core';

import { StatsService } from '../stats.service';
import { BarChart, LineChart, Chart, ChartData } from '../model/chartModel';

@Component({
  selector: 'app-stats-result',
  templateUrl: './stats-result.component.html'
})
export class StatsResultComponent {
  @Input() chart: Chart;
  @Input() stacked;

  @Output() before = new EventEmitter();
  @Output() success = new EventEmitter();
  @Output() error = new EventEmitter();

  chartTypes: Object = {
    line: '꺾은선형',
    bar: '세로 막대형'
  };

  constructor(private statsService: StatsService) { }

  onSubmit() {
    this.before.emit();
    this.statsService.queryChart(this.chart.data)
      .then(() => this.success.emit())
      .catch(() => this.error.emit());
  }
}
