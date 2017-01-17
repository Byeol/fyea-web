import { Component, Output, EventEmitter } from '@angular/core';

import { DataService } from '../data.service';

@Component({
  selector: 'app-data-clear',
  templateUrl: './data-clear.component.html'
})
export class DataClearComponent {
  @Output() before = new EventEmitter();
  @Output() success = new EventEmitter();
  @Output() error = new EventEmitter();

  constructor(private dataService: DataService) { }

  onSubmit() {
    this.before.emit();
    this.dataService.clearData()
      .then(() => this.success.emit())
      .catch(() => this.error.emit());
  }
}
