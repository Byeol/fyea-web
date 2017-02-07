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

  isLoading = false;
  alert: AlertData;

  constructor(private apiService: ApiService, private authService: AuthService, private router: Router) { }

  async onSubmit() {
    this.handleBefore();

    try {
      const status = await this.apiService.login(this.model);

      if (!status) {
        throw new Error();
      }

      this.handleSuccess();
    } catch (e) {
      this.handleError();
    } finally {
      this.handleAfter();
    }
  }

  get isAuthenticated() {
    return this.authService.isAuthenticated;
  }

  private handleBefore(): void {
    this.alert = null;
    this.isLoading = true;
  }

  private handleAfter(): void {
    this.isLoading = false;
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
