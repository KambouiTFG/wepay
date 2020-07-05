import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {
  constructor(private auth: AuthService,
              private router: Router) {}

canActivate(): boolean  {

  if ( this.auth.userStatus === null) {
    this.router.navigateByUrl('/login');
    return false;
  } else if (this.auth.role === 1) {
    return true;
  } else {
    this.router.navigateByUrl('/home');
    return false;
  }
}

  
}
