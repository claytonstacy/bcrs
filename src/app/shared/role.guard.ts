import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RoleService } from './services/role.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router, private http: HttpClient, private cookieService: CookieService, private roleService: RoleService ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    return this.roleService.findUserRole(this.cookieService.get('sessionuser')).pipe(map(res => {
      if (res['data'].find(r => r.text === 'admin')) {
        return true;
      } else {
        this.router.navigate(['/']);
        return false
      }
    }));
  }
}
