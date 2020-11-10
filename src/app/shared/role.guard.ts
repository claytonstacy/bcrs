/*
============================================
Title: BCRS
Author: Clayton Stacy, Christine Bohnet, Jeff Shepherd, Verlee Washington
Date: 5 November 2020
Description: RoleGuard for BCRS
============================================
*/

import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {UserService} from './services/user.service';
import {CookieService} from 'ngx-cookie-service';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router, private http: HttpClient, private cookieService: CookieService, private userService: UserService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
// Get user role from the db then check for admin role, return true if found
    return this.userService.findUserRole(this.cookieService.get('session_user'))
                           .pipe(map(res => {
      console.log('Checking role', res['data']);

      if (res['data'].role === 'admin') {
        return true;
      } else {
        this.router.navigate(['/']);
        return false;
      }
    }));
  }
}
