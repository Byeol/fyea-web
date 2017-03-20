import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, ResponseContentType } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { QueryModel, UserQueryModel } from './model/queryModel';

import { storageUrl, dataUrl, userUrl } from '../api-config';
import { ApiService } from '../core/api.service';

@Injectable()
export class DataService {
  constructor(private http: Http, private apiService: ApiService) { }

  getStorage(): Promise<string[]> {
    const options = new RequestOptions({
      headers: this.headers
    });

    return this.http
      .get(storageUrl, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  importData(data: QueryModel): Promise<Response> {
    const options = new RequestOptions({
      headers: this.headers
    });

    return this.http
      .post(`${dataUrl}/import`, JSON.stringify(data), options)
      .toPromise()
      .catch(this.handleError);
  }

  exportData(): Promise<Response> {
    const options = new RequestOptions({
      headers: this.headers,
      responseType: ResponseContentType.Blob
    });

    return this.http
      .get(`${dataUrl}/export`, options)
      .map(this.extractContent)
      .map(this.downloadFile)
      .toPromise()
      .catch(this.handleError);
  }

  clearData(): Promise<Response> {
    const options = new RequestOptions({
      headers: this.headers
    });

    return this.http
      .get(`${dataUrl}/clear`, options)
      .toPromise()
      .catch(this.handleError);
  }

  updateUser(data: UserQueryModel): Promise<Object> {
    const options = new RequestOptions({
      headers: this.headers
    });

    return this.http
      .put(userUrl, JSON.stringify(data), options)
      .toPromise()
      .then(() => this.apiService.login(data))
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

  private downloadFile(blob: Blob) {
    const reader = new FileReader();
    reader.onloadend = () => {
      window.location.href = reader.result;
    };
    reader.readAsDataURL(blob);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
