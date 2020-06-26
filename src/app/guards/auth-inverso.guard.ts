import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInversoGuard implements CanActivate {

  constructor(private auth: AuthService,
              private router: Router) {}


  canActivate(): boolean  {

    if ( this.auth.estaAutenticado() ) {
      console.log('[login-registro] esta autenticado -> pa home');
      this.router.navigateByUrl('/home');
      return true;
    } else {
      console.log('[login-registro] no esta autenticado -> pase');
      return false;
    }
 
  }
  
}
