import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { DataRoutingModule } from './data-routing.module';
import { DataComponent } from './data.component';
import { DataService } from './data.service';
import { DataChangePasswordComponent } from './data-change-password/data-change-password.component';
import { DataImportComponent } from './data-import/data-import.component';
import { DataExportComponent } from './data-export/data-export.component';
import { DataClearComponent } from './data-clear/data-clear.component';

@NgModule({
  imports: [
    SharedModule,
    DataRoutingModule
  ],
  declarations: [
    DataComponent,
    DataChangePasswordComponent,
    DataImportComponent,
    DataExportComponent,
    DataClearComponent
  ],
  providers: [
    DataService
  ]
})
export class DataModule { }
