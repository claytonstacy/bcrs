/*
============================================
Title: BCRS
Author: Clayton Stacy, Christine Bohnet, Jeff Shepherd
Date: 20 Oct 2020
Description:
============================================
*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../interfaces/role.interface';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) {}
  findAllRoles(): Observable<any> {
    return this.http.get('/api/roles');
  }

  findRoleById(roleId: string): Observable<any> {
    return this.http.get('/api/roles/' + roleId);
  }

  createRole(newRole: Role): Observable<any> {
    return this.http.post('/api/roles', {
      text: newRole.text
    })
  }
  updateRole(roleId: string, updateRole: Role): Observable<any> {
    return this.http.put('/api/roles/' + roleId, {
      text: updateRole.text
    })
  }
  deleteRole(roleId: string): Observable<any> {
    return this.http.delete('/api/roles/' + roleId);
  }

}
