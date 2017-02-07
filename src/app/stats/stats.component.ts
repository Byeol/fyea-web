import { Component, OnInit } from '@angular/core';

import { Headers, Http, Response } from '@angular/http';

import { StatsService } from './stats.service';
import { CodeMap } from './model/codeMap';
import { QueryModel } from './model/queryModel';
import { BarChart, LineChart, Chart, ChartData } from './model/chartModel';
import { StatisticsData, FrequencyStatisticsData, DescriptiveStatisticsData } from './model/statisticsData';

import { AlertData, AlertType } from '../shared/alert/alert-type';

export class KeyValueItem {
  key: string;
  value: string;
}

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html'
})
export class StatsComponent implements OnInit {
  model: QueryModel = new QueryModel();

  codeMap: CodeMap;
  chart: Chart;
  targetData: string = 'mean';
  dataQueried: boolean;

  surveyMap: Map<String, Array<KeyValueItem>>;
  stacked: boolean;

  isLoading = false;
  alert: AlertData;

  constructor(private statsService: StatsService) { }

  ngOnInit(): void {
    this.handleBefore();

    this.statsService.getCodeMap().then(codeMap => {
      this.codeMap = this.updateCodeMap(codeMap);
      this.surveyMap = this.createSurveyMap(this.toArray(this.surveyInfo));
    }).then(this.handleSuccess.bind(this))
    .catch(this.handleError.bind(this));
  }

  updateCodeMap(codeMap: CodeMap): CodeMap {
    if (codeMap.personalInfo.records['ID'] != null) {
      delete codeMap.personalInfo.records['ID'];
    }

    return codeMap;
  }

  createSurveyMap(surveys: KeyValueItem[]): Map<String, Array<KeyValueItem>> {
    const map = new Map<String, Array<KeyValueItem>>();

    surveys.forEach(item => {
      const splitedKey = item.key.split('_');
      const groupKey = splitedKey[0] === 'SURVEY' ? splitedKey[0].concat('_').concat(splitedKey[1]) : splitedKey[0];

      if (item.key === groupKey) {
        return;
      }

      const array = map.get(groupKey) || [];
      array.push(item);
      map.set(groupKey, array);
    });

    return map;
  }

  toArray(obj: Object): KeyValueItem[] {
    const keys = [];

    Object.keys(obj).sort().forEach(key => keys.push(
      { key: key, value: obj[key] }
    ));

    return keys;
  }

  get personalInfo() {
    return this.codeMap.personalInfo.records;
  }

  get surveyInfo() {
    return this.codeMap.surveyInfo.records;
  }

  onSubmit() {
    this.dataQueried = false;
    this.handleBefore();

    this.statsService.queryStats(this.model)
      .then(this.createChart.bind(this))
      .then(() => this.dataQueried = true)
      .then(this.handleSuccess.bind(this))
      .catch(this.handleError.bind(this));
  }

  createChart(data: StatisticsData): void {
    if (data.hasOwnProperty('frequencyMap')) {
      this.createFrequencyChart(data as FrequencyStatisticsData);
      return;
    }

    if (data.hasOwnProperty('statisticsMap')) {
      this.createStatisticsChart(data as DescriptiveStatisticsData);
      return;
    }
  }

  createStatisticsChart({ statisticsMap }): void {
    this.chart = new LineChart();
    this.chart.data = {
      labels: this.model.surveys.map(key => this.surveyInfo[key]),
      datasets: []
    };
    this.stacked = false;

    Object.keys(statisticsMap).forEach(key => this.chart.data.datasets.push({
      fill: false,
      label: key,
      data: statisticsMap[key].map(x => x[this.targetData])
    }));
  }

  createFrequencyChart({ frequencyMap, conditionAnswerMap, surveyAnswerMap }) {
    this.chart = new BarChart();
    this.chart.data = {
      labels: conditionAnswerMap.answers,
      datasets: []
    };
    this.stacked = true;

    const totalN = this.getTotalN(this.asArray(frequencyMap));

    Object.keys(frequencyMap).filter(Boolean).forEach(key => this.chart.data.datasets.push({
      fill: false,
      label: surveyAnswerMap.codeMap.records[key] || key,
      data: frequencyMap[key].map((x, idx) => x / totalN[idx] * 100)
    }));
  }

  asArray(map: Object) {
    const list = [];
    Object.keys(map).filter(Boolean).forEach(key => list.push(map[key]));
    return list;
  }

  getTotalN(list: number[][]) {
    return list.reduce((r, a) => {
      a.forEach((b, i) => {
        r[i] = (r[i] || 0 ) + b;
      });
      return r;
    }, []);
  }

  handleBefore(): void {
    this.alert = null;
    this.isLoading = true;
  }

  handleSuccess(): void {
    this.alert = null;
    this.isLoading = false;
  }

  handleError(): void {
    this.alert = AlertType.error;
    this.isLoading = false;
  }
}
