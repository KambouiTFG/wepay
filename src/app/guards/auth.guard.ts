import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { Auth2Service } from '../services/auth2.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private auth: Auth2Service,
               private router: Router) {}

  canActivate(): boolean  {

   if ( this.auth.userStatus != null) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
 
  }

}
