import { Component, EventEmitter, Input, Output } from '@angular/core';

import { StatsService } from '../stats.service';
import { CodeMap } from '../model/codeMap';
import { QueryModel } from '../model/queryModel';
import { Chart } from '../model/chartModel';

@Component({
  selector: 'app-stats-export',
  templateUrl: './stats-export.component.html'
})
export class StatsExportComponent {
  @Input() model: QueryModel = new QueryModel();
  @Input() chart: Chart;
  @Input() codeMap: CodeMap;

  @Output() before = new EventEmitter();
  @Output() success = new EventEmitter();
  @Output() error = new EventEmitter();

  constructor(private statsService: StatsService) { }

  onSubmit() {
    this.before.emit();
    this.statsService.exportStats(this.model)
      .then(() => this.success.emit())
      .catch(() => this.error.emit());
  }

  get selectedCondition() {
    return this.personalInfo[this.model.condition];
  }

  get selectedSurveys() {
    return this.model.surveys.map(key => this.surveyInfo[key]);
  }

  get personalInfo() {
    return this.codeMap.personalInfo.records;
  }

  get surveyInfo() {
    return this.codeMap.surveyInfo.records;
  }
}
