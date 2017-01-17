import { Component, Input } from '@angular/core';

import { AlertData } from './alert-type';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html'
})
export class AlertComponent {
  @Input() data: AlertData;
}
