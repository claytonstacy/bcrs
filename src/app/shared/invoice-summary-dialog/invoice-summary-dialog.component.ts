/******************************************************************************
 * Title: invoice-summary-dialog.component.ts
 * Author: Verlee Washington
 * Modified by:
 * Date: 11/06/2020
 * Description: Dialog for the invoice summary dialog
 *****************************************************************************/

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Invoice } from '../interfaces/invoice.interface';

@Component({
  selector: 'app-invoice-summary-dialog',
  templateUrl: './invoice-summary-dialog.component.html',
  styleUrls: ['./invoice-summary-dialog.component.css']
})
export class InvoiceSummaryDialogComponent implements OnInit {
  invoice: Invoice;

  constructor(private dialogRef: MatDialogRef<InvoiceSummaryDialogComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.invoice = data.invoice;
  }

  ngOnInit(): void {
  }
}
