import { Component } from '@angular/core';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent {

  constructor(private authService: AuthService) {}

  get isAuthenticated() {
    return this.authService.isAuthenticated;
  }
}
