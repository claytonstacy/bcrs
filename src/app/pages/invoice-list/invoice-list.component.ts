/******************************************************************************
 * Title: invoice-list.component.ts
 * Author: Clayton Stacy
 * Modified by:
 * Date: 11/5/2020
 * Description: Typescript file for invoice list component
 *****************************************************************************/

 import { Component, OnInit } from '@angular/core';
 import { InvoiceService } from '../../shared/services/invoice.service';
 import { Invoice } from '../../shared/interfaces/invoice.interface';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {

  invoices: Invoice[];
  displayedColumns: string[] = [
    'userName',
    'partsAmount',
    'laborAmount',
    'lineItemTotal',
    'total',
    'orderDate'];

  constructor(private invoiceService: InvoiceService) {

    this.invoiceService.findAllInvoices().subscribe(res => {
      this.invoices = res.data;
      console.log('Got the invoices', this.invoices)
      // console.log(JSON.stringify(this.users));
    }, err => {
      console.log(err);
    });
   }

  ngOnInit(): void {
  }

}
