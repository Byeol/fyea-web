import { Component, OnInit } from '@angular/core';

import { AlertData, AlertType } from '../shared/alert/alert-type';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html'
})
export class DataComponent {

  alert: AlertData;

  handleBefore(): void {
    this.alert = AlertType.loading;
  }

  handleSuccess(): void {
    this.alert = AlertType.success;
  }

  handleError(): void {
    this.alert = AlertType.error;
  }
}
