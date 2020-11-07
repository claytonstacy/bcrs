/******************************************************************************
 * Title: service-repair.service.ts
 * Author: Verlee Washington
 * Modified by:
 * Date: 11/6/2020
 * Description: Service repair services for service items
 *****************************************************************************/

import { ServiceRepairItem } from './../shared/service-repair-item.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceRepairService {
  serviceRepairItems: ServiceRepairItem[];

  constructor() {
    this.serviceRepairItems = [
      {
        id: '101',
        title: 'Password Reset',
        price: 39.99
      },
      {
        id: '102',
        title: 'Spyware Removal',
        price: 99.99
      },
      {
        id: '103',
        title: 'RAM Upgrade',
        price: 129.99
      },
      {
        id: '104',
        title: 'Software Installation',
        price: 49.99
      },
      {
        id: '105',
        title: 'PC Tune-up',
        price: 89.99
      },
      {
        id: '106',
        title: 'Keyboard Cleaning',
        price: 45.00
      },
      {
        id: '107',
        title: 'Disk Clean-up',
        price: 149.99
      }
    ]
  }

  getServiceRepairItems(): ServiceRepairItem[] {
    return this.serviceRepairItems;
  }
}
