/*
============================================
Title: BCRS
Author: Clayton Stacy, Christine Bohnet, Jeff Shepherd, Verlee Washington
Date: 20 Oct 2020
Description: home component ts file
============================================
*/

import { Component, OnInit } from '@angular/core';
import { Invoice } from '../../shared/interfaces/invoice.interface';
import { InvoiceService } from 'src/app/shared/services/invoice.service';
import { InvoiceSummaryDialogComponent } from '../../shared/invoice-summary-dialog/invoice-summary-dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { LineItem } from '../../shared/interfaces/line-item.interface';
import { Product } from '../../shared/interfaces/product.interface';
import { ProductService } from '../../shared/services/product.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  form: FormGroup;
  userName: string;
  products: Product[];
  lineItems: LineItem[];

  constructor(private cookieService: CookieService, private fb: FormBuilder,
              private dialog: MatDialog, private router: Router,
              private productService: ProductService,
              private invoiceService: InvoiceService) {

      // get the username
      this.userName = this.cookieService.get('session_user');

      // get the service repair items
      this.productService.findAllProducts().subscribe(res => {
        this.products = res.data;
        console.log(this.products);
      }, err => {
        console.log(err);
      });

    }

  ngOnInit(): void {
    this.form = this.fb.group({
      parts: [null, Validators.compose([Validators.required])],
      labor: [null, Validators.compose([Validators.required])]
    });
  }

  submit(form): void {
    const selectedProductIds = [];
    for (const [key, value] of Object.entries(form.checkGroup)) {
      if (value) { // iterate over checkboxes and give me the id
        selectedProductIds.push({
          _id: key
        });
      }
    }

    this.lineItems = [];

    // build the invoice object
    for (const savedProduct of this.products) {
      for (const selectedProduct of selectedProductIds) {
        if (savedProduct._id === selectedProduct._id) {
          this.lineItems.push({
            title: savedProduct.title,
            price: savedProduct.price
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
      partsAmount,
      laborAmount,
      lineItemTotal,
      total,
      orderDate: new Date()
    } as Invoice;

    console.log(invoice);

    const dialogRef = this.dialog.open(InvoiceSummaryDialogComponent, {
      data: {
        invoice
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
        });
      }
    });
  }
}
