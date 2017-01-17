import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { QueryModel } from '../model/queryModel';
import { ApiService } from '../../core/api.service';

import { AlertData } from '../../shared/alert/alert-type';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  model: QueryModel = new QueryModel();
  alert: AlertData;

  constructor(private apiService: ApiService, private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.apiService.login(this.model)
      .then(status => {
        if (!status) {
          return this.handleError();
        }

        this.handleSuccess();
      });
  }

  get isAuthenticated() {
    return this.authService.isAuthenticated;
  }

  private handleSuccess() {
    this.router.navigate(['/']);
    this.alert = {
      type: 'success',
      message: '로그인에 성공했습니다!'
    };
  }

  private handleError(): void {
    this.alert = {
      type: 'danger',
      message: '로그인에 실패했습니다.'
    };
  }
}
