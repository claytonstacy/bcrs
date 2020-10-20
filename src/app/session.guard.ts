/******************************************************************************
 * Title: session.guard.ts
 * Author: Professor Krasso
 * Modified by: Jeff Shepherd
 * Date: 10/20/2020
 * Description: auth guard
 *****************************************************************************/

import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot,
        CanActivate,
        Router,
        RouterStateSnapshot} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private cookieService: CookieService) {
  }

  /****************************************************************************
   * After the user successfully signs in to their account with username and
   * password, the username is saved as a cookie. If the cookie is present,
   * this function returns true. If not present, the the user is redirected to
   * the sign-in page.
   ***************************************************************************/
  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean {
    const sessionUser = this.cookieService.get('session_user');
    if (sessionUser) {
      return true;
    } else {
      this.router.navigate(['session/signin']);
      return false;
    }
  }

}
