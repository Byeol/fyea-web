import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { StatsRoutingModule } from './stats-routing.module';
import { StatsComponent } from './stats.component';
import { StatsService } from './stats.service';
import { StatsResultComponent } from './stats-result/stats-result.component';
import { StatsExportComponent } from './stats-export/stats-export.component';

@NgModule({
  imports: [
    SharedModule,
    StatsRoutingModule
  ],
  declarations: [
    StatsComponent,
    StatsResultComponent,
    StatsExportComponent
  ],
  providers: [
    StatsService
  ]
})
export class StatsModule { }
