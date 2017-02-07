import { Component, OnInit } from '@angular/core';

import { AlertData, AlertType } from '../shared/alert/alert-type';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html'
})
export class DataComponent {
  isLoading = false;
  alert: AlertData;

  handleBefore(): void {
    this.alert = null;
    this.isLoading = true;
  }

  handleSuccess(): void {
    this.alert = AlertType.success;
    this.isLoading = false;
  }

  handleError(): void {
    this.alert = AlertType.error;
    this.isLoading = false;
  }
}
