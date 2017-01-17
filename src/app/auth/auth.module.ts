import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    SharedModule,
    AuthRoutingModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    AuthGuard,
    AuthService
  ]
})
export class AuthModule { }
