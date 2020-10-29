/******************************************************************************
 * Title: product-details.component.ts
 * Author: Jeff Shepherd
 * Modified by:
 * Date: 10/29/2020
 * Description: product details
 *****************************************************************************/

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../shared/product.interface';
import { ProductService } from '../../shared/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  form: FormGroup;
  productId: string;
  product: Product;

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder, private router: Router,
              private productService: ProductService ) {

    this.productId = this.route.snapshot.paramMap.get('productId');

    this.productService.findProductById(this.productId).subscribe(res => {
      this.product = res.data;
    }, err => {
      console.log(err);
    }, () => {
      this.form.controls.text.setValue(this.product.text);
      this.form.controls.price.setValue(this.product.price);
    });
  }

  ngOnInit(): void {
    const decimalPattern = '^\\d+(\\.\\d{1,2})?$';

    this.form = this.fb.group({
      text: [null, Validators.compose([Validators.required])],

      price: [null, Validators.compose([Validators.required,
                    Validators.pattern(decimalPattern)])]
    });
  }

  saveProduct(): void {
      // The 'as' keyword tells TypeScript to ignore type inference and consider,
      // in this case, an empty object named 'newUser' as an object of type User
      const updatedProduct = {} as Product;

      updatedProduct.text = this.form.controls.text.value;
      updatedProduct.price = this.form.controls.price.value;

      this.productService.updateProduct(this.productId, updatedProduct)
                         .subscribe(() => {
                            this.router.navigate(['/products']);
      }, err => {
        console.log(err);
      });
    }

  cancel(): void {
    this.router.navigate(['/products']);
  }

  getErrorMessage() {
    if (this.form.controls.text.hasError('required')) {
      return 'You must enter a value';
    }
  }
}
