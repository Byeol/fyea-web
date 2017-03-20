import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, ResponseContentType } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { AnswerMap } from './model/answerMap';
import { CodeMap } from './model/codeMap';
import { QueryModel } from './model/queryModel';
import { StatisticsData } from './model/statisticsData';
import { ChartData } from './model/chartModel';

import { answersUrl, answerMapUrl, codeMapUrl, statsUrl } from '../api-config';
import { ApiService } from '../core/api.service';

@Injectable()
export class StatsService {
  constructor(private http: Http, private apiService: ApiService) { }

  getAvailableAnswers(): Promise<String[]> {
    const options = new RequestOptions({
      headers: this.headers,
    });

    return this.http
      .get(answersUrl, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getAnswerMap(id: string): Promise<AnswerMap> {
    const options = new RequestOptions({
      headers: this.headers,
    });

    return this.http
      .get(`${answerMapUrl}/${id}`, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getCodeMap(): Promise<CodeMap> {
    const options = new RequestOptions({
      headers: this.headers,
    });

    return this.http
      .get(codeMapUrl, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  queryStats(queryModel: QueryModel): Promise<StatisticsData> {
    const options = new RequestOptions({
      headers: this.headers,
    });

    return this.http
      .post(statsUrl, JSON.stringify(queryModel), options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  exportStats(queryModel: QueryModel): Promise<Blob> {
    const options = new RequestOptions({
      headers: this.headers,
      responseType: ResponseContentType.Blob
    });

    return this.http
      .post(`${statsUrl}/export`, JSON.stringify(queryModel), options)
      .map(this.extractContent)
      .toPromise()
      .catch(this.handleError);
  }

  queryChart(chartData: ChartData): Promise<Blob> {
    const options = new RequestOptions({
      headers: this.headers,
      responseType: ResponseContentType.Blob
    });

    return this.http
      .post(`${statsUrl}/chart`, JSON.stringify(chartData), options)
      .map(this.extractContent)
      .toPromise()
      .catch(this.handleError);
  }

  get headers(): Headers {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    this.apiService.updateHeader(headers);
    return headers;
  }

  private extractContent(res: Response) {
    const blob: Blob = res.blob();
    return blob;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
