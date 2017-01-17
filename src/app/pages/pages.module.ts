import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { PagesRoutingModule } from './pages-routing.module';
import { IntroComponent } from './intro/intro.component';

@NgModule({
  imports: [
    SharedModule,
    PagesRoutingModule
  ],
  declarations: [
    IntroComponent
  ]
})
export class PagesModule { }
