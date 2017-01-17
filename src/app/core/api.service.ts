import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { userUrl } from '../api-config';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ApiService {
  constructor(private http: Http, private authService: AuthService) {}

  login({ username = 'user', password }) {
    this.authService.loginInfo = {
      username: username,
      password: password
    };

    return this.isAuthenticated()
      .then(status => {
        this.authService.isAuthenticated = status;
        return status;
      });
  }

  updateHeader(headers: Headers) {
    const user = this.authService.loginInfo;
    const encoded = btoa(`${user.username}:${user.password}`);
    headers.append('Authorization', `Basic ${encoded}`);
  }

  isAuthenticated(): Promise<boolean> {
    const options = new RequestOptions({
      headers: this.headers,
    });

    return this.http
      .get(userUrl, options)
      .toPromise()
      .then(() => true)
      .catch(() => false);
  }

  get headers(): Headers {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    this.updateHeader(headers);
    return headers;
  }

  handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
