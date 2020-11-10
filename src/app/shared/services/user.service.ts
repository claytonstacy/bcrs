/******************************************************************************
 * Title: user.service.ts
 * Author: Jeff Shepherd
 * Modified by:
 * Date: 10/22/2020
 * Description: user service
 *****************************************************************************/
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})

/******************************************************************************
 * All five of these functions return an Observable of type any. We use type
 * any because it will return either a BaseResponse object or an ErrorResponse
 * object.
 *****************************************************************************/
export class UserService {

  constructor(private http: HttpClient) { }

  findAllUsers(): Observable<any> {
    return this.http.get('api/users');
  }

  findUserById(userId: string): Observable<any> {
    return this.http.get('/api/users/' + userId);
  }

  createUser(user: User): Observable<any> {
    return this.http.post('/api/users/', {
      // req body
      userName: user.userName,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      email: user.email,
      securityQuestions: user.securityQuestions
    });
  }

  updateUser(userId: string, user: User): Observable<any> {
    return this.http.put('/api/users/' + userId, {
      // req body
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      email: user.email,
      role: user.role
    });
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete('/api/users/' + userId);
  }

  findUserRole(userName: string): Observable<any> {
    return this.http.get(`/api/users/${userName}/roles`);
  }

}
