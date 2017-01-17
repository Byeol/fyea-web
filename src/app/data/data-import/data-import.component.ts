import { Component, Output, EventEmitter, OnInit } from '@angular/core';

import { DataService } from '../data.service';
import { QueryModel } from '../model/queryModel';

@Component({
  selector: 'app-data-import',
  templateUrl: './data-import.component.html'
})
export class DataImportComponent implements OnInit {
  @Output() before = new EventEmitter();
  @Output() success = new EventEmitter();
  @Output() error = new EventEmitter();

  model = new QueryModel();
  files: string[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getStorage().then(files => {
      this.files = files;
    });
  }

  onSubmit() {
    this.before.emit();
    this.dataService.importData(this.model)
      .then(() => this.success.emit())
      .catch(() => this.error.emit());
  }
}
