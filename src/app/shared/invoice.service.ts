/******************************************************************************
 * Title: invoice.service.ts
 * Author: Jeff Shepherd
 * Modified by:
 * Date: 11/5/2020
 * Description: invoice service
 *****************************************************************************/
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//import Invoice interface once it is written

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient) { }

  // Once the invoice interface is made, change the type of invoice to Invoice
  createInvoice(userName: string, invoice: any): Observable<any> {
    return this.http.post('/api/invoices/' + userName, {
      userName: userName,
      lineItems: invoice.lineItems,
      partsAmount: invoice.partsAmount,
      laborAmount: invoice.laborAmount,
      lineItemTotal: invoice.lineItemTotal,
      total: invoice.total
    })
  }

  findPurchasesByServiceGraph() {
    return this.http.get('/api/invoices/purchases-graph');
  }
}
