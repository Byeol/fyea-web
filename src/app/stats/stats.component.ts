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
  _idStartsWith: string[];

  availableConditions: KeyValueItem[];
  availableAnswers: String[];
  availableYears: Number[];
  codeMap: CodeMap;
  chart: Chart;
  targetData = 'mean';
  _statsData: Map<String, StatisticsData>;
  surveyMap: Map<String, Array<KeyValueItem>>;
  stacked: boolean;
  alternative = true;

  isLoading = false;
  alert: AlertData;
  activeTabIndex = 0;

  constructor(private statsService: StatsService) { }

  async ngOnInit() {
    this.handleBefore();

    try {
      this.availableAnswers = await this.statsService.getAvailableAnswers();

      const codeMap = await this.statsService.getCodeMap();
      this.codeMap = this.updateCodeMap(codeMap);
      this.surveyMap = this.createSurveyMap(this.toArray(this.surveyInfo));
      this.availableConditions = this.getAvailableConditions(this.toArray(this.personalInfo));

      const answerMap = await this.statsService.getAnswerMap('ADMISSION_YEAR');
      this.availableYears = answerMap.answers;
    } catch (e) {
      this.handleError();
    } finally {
      this.handleAfter();
    }
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

      if (!this.availableAnswers.includes(item.key)) {
        return;
      }

      const array = map.get(groupKey) || [];
      array.push(item);
      map.set(groupKey, array);
    });

    return map;
  }

  getAvailableConditions(conditions: KeyValueItem[]): KeyValueItem[] {
    return conditions.filter(item => this.availableAnswers.includes(item.key));
  }

  toArray(obj: Object): KeyValueItem[] {
    const keys = [];

    Object.keys(obj).sort().forEach(key => keys.push(
      { key: key, value: obj[key] }
    ));

    return keys;
  }

  get idStartsWith() {
    return this._idStartsWith;
  }

  set idStartsWith(value) {
    this._idStartsWith = value;
    this.model.idStartsWith = value;
  }

  get personalInfo() {
    return this.codeMap.personalInfo.records;
  }

  get surveyInfo() {
    return this.codeMap.surveyInfo.records;
  }

  async onSubmit() {
    this.handleBefore();
    this.statsData = null;

    try {
      const statsDataMap = new Map();

      for (const id of this.idStartsWith) {
        this.model.idStartsWith = [id];
        statsDataMap.set(id, await this.statsService.queryStats(this.model) as StatisticsData);
      }

      this.model.idStartsWith = this.idStartsWith;
      this.statsData = statsDataMap;
    } catch (e) {
      this.handleError();
    } finally {
      this.handleAfter();
    }
  }

  get statsData() {
    return this._statsData;
  }

  set statsData(value) {
    this._statsData = value;
    this.chart = this.createChart(this.statsData, this.alternative);
    this.activeTabIndex = 1;
  }

  get isFrequencyAvailable() {
    return this.model.surveys && this.model.surveys.length === 1;
  }

  get isMultipleYears() {
    return this.idStartsWith && this.idStartsWith.length > 1;
  }

  createChart(data: Map<String, StatisticsData>, alternative: boolean): Chart {
    if (data === null || data === undefined) {
      return null;
    }

    if (this.mapToArray(data)[0].hasOwnProperty('frequencyMap')) {
      return this.createFrequencyChart(this.mapToArray(data)[0] as FrequencyStatisticsData);
    }

    if (this.mapToArray(data)[0].hasOwnProperty('statisticsMap')) {
      if (alternative) {
        return this.createAlternativeStatisticsChart(data as Map<String, DescriptiveStatisticsData>);
      }

      return this.createStatisticsChart(this.mapToArray(data)[0] as DescriptiveStatisticsData);
    }
    return null;
  }

  getConditions(data: Map<String, DescriptiveStatisticsData>) {
    return this.mergeArray(this.mapToArray(data).map(x => Object.keys(x.statisticsMap))).sort(this.compareLabels);
  }

  createAlternativeStatisticsChart(data: Map<String, DescriptiveStatisticsData>): LineChart {
    const chart = new LineChart();
    chart.data = {
      labels: this.getConditions(data),
      datasets: []
    };

    data.forEach(({ statisticsMap }, dataKey) => this.model.surveys.map(key => this.surveyInfo[key]).forEach((label, idx) => chart.data.datasets.push({
      lineTension: 0,
      fill: false,
      label: `(${dataKey}) ${label}`,
      data: chart.data.labels.map(key => statisticsMap[key][idx][this.targetData])
    })));

    return chart;
  }

  createStatisticsChart({ statisticsMap }): LineChart {
    const chart = new LineChart();
    chart.data = {
      labels: this.model.surveys.map(key => this.surveyInfo[key]),
      datasets: []
    };

    Object.keys(statisticsMap).sort(this.compareLabels).forEach(key => chart.data.datasets.push({
      lineTension: 0,
      fill: false,
      label: key,
      data: statisticsMap[key].map(x => x[this.targetData])
    }));

    return chart;
  }

  createFrequencyChart({ frequencyMap, conditionAnswerMap, surveyAnswerMap }): BarChart {
    const chart = new BarChart();
    chart.data = {
      labels: conditionAnswerMap.answers,
      datasets: []
    };

    const totalN = this.getTotalN(this.asArray(frequencyMap));

    Object.keys(frequencyMap).filter(Boolean).forEach(key => chart.data.datasets.push({
      lineTension: 0,
      fill: false,
      label: surveyAnswerMap.codeMap.records[key] || key,
      data: frequencyMap[key].map((x, idx) => x / totalN[idx] * 100)
    }));

    return chart;
  }

  private asArray(map: Object) {
    const list = [];
    Object.keys(map).filter(Boolean).forEach(key => list.push(map[key]));
    return list;
  }

  private mergeArray<T>(arr: T[][]): T[] {
    return Array.from(new Set([].concat(...arr)));
  }

  private mapToArray<K, V>(map: Map<K, V>): Array<V> {
    return Array.from(map.values());
  }

  getTotalN(list: number[][]) {
    return list.reduce((r, a) => {
      a.forEach((b, i) => {
        r[i] = (r[i] || 0 ) + b;
      });
      return r;
    }, []);
  }

  private compareLabels(a, b) {
    if (a === '전체') {
      return 1;
    }
    if (b === '전체') {
      return -1;
    }
    return a.localeCompare(b);
  }

  handleBefore(): void {
    this.alert = null;
    this.isLoading = true;
  }

  handleAfter(): void {
    this.isLoading = false;
  }

  handleError(): void {
    this.alert = AlertType.error;
  }
}
