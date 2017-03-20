import { Component, Output, EventEmitter } from '@angular/core';
import { saveAs } from 'file-saver';

import { DataService } from '../data.service';

@Component({
  selector: 'app-data-export',
  templateUrl: './data-export.component.html'
})
export class DataExportComponent {
  @Output() before = new EventEmitter();
  @Output() success = new EventEmitter();
  @Output() error = new EventEmitter();

  constructor(private dataService: DataService) { }

  onSubmit() {
    this.before.emit();
    this.dataService.exportData()
      .then(blob => saveAs(blob, `UCDS_내보낸 데이터.xlsx`))
      .then(() => this.success.emit())
      .catch(() => this.error.emit());
  }
}
