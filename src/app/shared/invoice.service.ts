/******************************************************************************
 * Title: invoice.service.ts
 * Author: Jeff Shepherd
 * Modified by:
 * Date: 11/5/2020
 * Description: invoice service
 *****************************************************************************/
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Invoice} from './invoice.interface';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient) {
  }

  createInvoice(userName: string, invoice: Invoice): Observable<any> {
    return this.http.post('/api/invoice/' + userName, {
      userName: userName,
      lineItems: invoice.lineItems,
      partsAmount: invoice.partsAmount,
      laborAmount: invoice.laborAmount,
      lineItemTotal: invoice.lineItemTotal,
      total: invoice.total
    });
  }

  findPurchasesByServiceGraph(): Observable<any> {
    return this.http.get('/api/invoice/purchases-graph');
  }

  findAllInvoices(): Observable<any> {
    return this.http.get('api/invoice');
  }
}
