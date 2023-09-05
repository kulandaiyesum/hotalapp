import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  constructor() {}

  login(email: string, password: string) {
    if (email === 'admin@123' && password === 'admin@pass') {
      this.isLoggedIn = true;
      this.isAdmin = true;
    }
    if (email === 'user@123' && password === 'user@pass') {
      this.isLoggedIn = true;
      this.isAdmin = false;
    }
    return this.isLoggedIn;
  }
}
