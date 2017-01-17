import { Component, Output, EventEmitter } from '@angular/core';

import { DataService } from '../data.service';
import { UserQueryModel } from '../model/queryModel';

@Component({
  selector: 'app-data-change-password',
  templateUrl: './data-change-password.component.html'
})
export class DataChangePasswordComponent {
  @Output() before = new EventEmitter();
  @Output() success = new EventEmitter();
  @Output() error = new EventEmitter();

  model = new UserQueryModel();

  constructor(private dataService: DataService) { }

  onSubmit() {
    this.before.emit();
    this.dataService.updateUser(this.model)
      .then(() => this.success.emit())
      .catch(() => this.error.emit());
  }
}
