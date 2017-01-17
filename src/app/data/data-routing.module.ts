import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataComponent } from './data.component';
import { AuthGuard } from '../auth/auth-guard.service';

const routes: Routes = [
  {
    path: 'data',
    component: DataComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class DataRoutingModule { }
