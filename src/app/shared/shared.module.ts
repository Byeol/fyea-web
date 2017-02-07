import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { KeysPipe } from './keys.pipe';
import { MapEntriesPipe } from './map-entries.pipe';
import { AlertComponent } from './alert/alert.component';
import { MdOptGroup } from './md-opt-group/opt-group';
import { SpinnerComponent } from './spinner/spinner.component';
import { OverlayDirective } from './overlay.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    NgbModule,
    ChartsModule
  ],
  declarations: [
    KeysPipe,
    MapEntriesPipe,
    AlertComponent,
    MdOptGroup,
    OverlayDirective,
    SpinnerComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    KeysPipe,
    MapEntriesPipe,
    MaterialModule,
    FlexLayoutModule,
    NgbModule,
    ChartsModule,
    AlertComponent,
    MdOptGroup,
    SpinnerComponent
  ]
})
export class SharedModule { }
