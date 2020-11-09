/*
============================================
Title: BRCS
Author: Clayton Stacy, Christine Bohnet, Jeff Shepherd, Verlee Washington
Date: 5 November 2020
Description: RoleGuardd for BCRS
============================================
*/

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from './services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router, private http: HttpClient, private cookieService: CookieService, private userService: UserService ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
// Get user role from the db then check for admin role, return true if found
      return this.userService.findUserRole(this.cookieService.get('session_user')).pipe(map(res => {
      console.log('Checking role', res['data'])
       if (res['data'].role === 'admin') {
        return true;
      } else {
        this.router.navigate(['/']);
        return false
      }
    }));
  }
}
