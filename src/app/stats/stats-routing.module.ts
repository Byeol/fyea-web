import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatsComponent } from './stats.component';
import { AuthGuard } from '../auth/auth-guard.service';

const routes: Routes = [
  {
    path: 'stats',
    component: StatsComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class StatsRoutingModule { }
