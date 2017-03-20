import { Component, EventEmitter, Input, Output } from '@angular/core';
import { saveAs } from 'file-saver';

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
      .then(blob => saveAs(blob, this.fileName))
      .then(() => this.success.emit())
      .catch(() => this.error.emit());
  }

  get fileName(): string {
    const surveys = this.selectedSurveys.length === 1 ? `${this.selectedSurveys}` : '설문';
    return `UCDS_${this.model.idStartsWith}_${this.selectedCondition}_${surveys}.xlsx`;
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
