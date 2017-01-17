import { Injectable } from '@angular/core';

export class LoginInfo {
  username: string;
  password: string;
}

@Injectable()
export class AuthService {
  private username: string;
  private password: string;

  isAuthenticated: boolean = false;

  set loginInfo({username, password}: LoginInfo) {
    this.username = username;
    this.password = password;
  }

  get loginInfo(): LoginInfo {
    return {
      username: this.username,
      password: this.password
    };
  }
}
