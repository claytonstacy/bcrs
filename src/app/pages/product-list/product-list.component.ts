/******************************************************************************
 * Title: product-list.component.ts
 * Author: Jeff Shepherd
 * Modified by:
 * Date: 10/28/2020
 * Description: product list
 *****************************************************************************/

import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Product} from '../../shared/product.interface';
import {ProductService} from '../../shared/product.service';
import {DeleteRecordDialogComponent} from '../../shared/delete-record-dialog/delete-record-dialog.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];

  displayedColumns: string[] = ['text', 'price', 'functions'];

  constructor(private dialog: MatDialog,
              private productService: ProductService) {

    this.productService.findAllProducts().subscribe(res => {
      this.products = res.data;
      console.log(this.products);
    }, err => {
      console.log(err);
    });
  }

  ngOnInit(): void {
  }

  delete(productId, name): void {
    const dialogRef = this.dialog.open(DeleteRecordDialogComponent, {
      data: {
        dialogHeader: 'Delete Record Dialog',
        dialogBody: `Are you sure you want to delete item ${name}?`
      },
      disableClose: true,
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.productService.deleteProduct(productId).subscribe(res => {
          console.log('Product deleted');
          this.products = this.products.filter(item => item._id !== productId);
        });
      }
    });
  }
}
