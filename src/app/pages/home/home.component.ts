/*
============================================
Title: BCRS
Author: Clayton Stacy, Christine Bohnet, Jeff Shepherd, Verlee Washington
Date: 20 Oct 2020
Description: home component ts file
============================================
*/

import { Component, OnInit } from '@angular/core';
import { Invoice } from '../../shared/invoice.interface';
import { InvoiceService } from 'src/app/shared/invoice.service';
import { ServiceRepairItem } from './../../shared/service-repair-item.interface';
import { InvoiceSummaryDialogComponent } from '../../shared/invoice-summary-dialog/invoice-summary-dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ServiceRepairService } from '../../shared/service-repair.service';
import { LineItem } from '../../shared/line-item.interface';
import { subscribeOn } from 'rxjs/operators';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  form: FormGroup;
  userName: string;
  services: ServiceRepairItem[];
  lineItems: LineItem[];

  constructor(private http: HttpClient, private cookieService: CookieService, private fb: FormBuilder,
    private dialog: MatDialog, private router: Router, private serviceRepairService: ServiceRepairService,
    private invoiceService: InvoiceService) {

      // get the username
      this.userName = this.cookieService.get('sessionuser');
      // get the service repair items
      this.services = this.serviceRepairService.getServiceRepairItems();
    }

  ngOnInit() {
    this.form = this.fb.group({
      parts: [null, Validators.compose([Validators.required])],
      labor: [null, Validators.compose([Validators.required])],
      alternator: [null, null]
    });
  }

  submit(form) {
    const selectedServiceIds = [];
    for (const [key, value] of Object.entries(form.checkGroup)) {
      if (value) { // iterate over checkboxes and give me the id
        selectedServiceIds.push({
          id: key
        });
      }
    }

    this.lineItems = [];

    // build the invoice object
    for (const savedService of this.services) {
      for (const selectedService of selectedServiceIds) {
        if (savedService.id === selectedService.id) {
          this.lineItems.push({
            title: savedService.title,
            price: savedService.price
          });
        }
      }
    }

    console.log(this.lineItems);

    const partsAmount = parseFloat(form.parts);
    const laborAmount = form.labor * 50;
    const lineItemTotal = this.lineItems.reduce((prev, cur) => prev + cur.price, 0);
    const total = partsAmount + laborAmount + lineItemTotal;


    // create the invoice object
    const invoice = {
      userName: this.userName,
      lineItems: this.lineItems,
      partsAmount: partsAmount,
      laborAmount: laborAmount,
      lineItemTotal: lineItemTotal,
      total: total,
      orderDate: new Date()
    } as Invoice;

    console.log(invoice);

    const dialogRef = this.dialog.open(InvoiceSummaryDialogComponent, {
      data: {
        invoice: invoice
      },
      disableClose: true,
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        console.log('Invoice saved');

        this.invoiceService.createInvoice(invoice.userName, invoice).subscribe(res => {
          this.router.navigate(['/']);
        }, err => {
          console.log(err);
        })
      }
    });
  }
}
