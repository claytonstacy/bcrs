/******************************************************************************
 * Title: user-data.service.ts
 * Author: Jeff Shepherd
 * Modified by:
 * Date: 11/2/2020
 * Description: user-data service
 *****************************************************************************/
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private userId: string;
  private userName: string;

  constructor() { }

  get id(): string {
    return this.userId;
  }

  get name(): string {
    return this.userName;
  }

  set id(id: string) {
    this.userId = id;
  }

  set name(name: string) {
    this.userName = name;
  }
}
