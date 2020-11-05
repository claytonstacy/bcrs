/******************************************************************************
 * Title: product-create.component.ts
 * Author: Jeff Shepherd
 * Modified by:
 * Date: 10/29/2020
 * Description: product create component
 *****************************************************************************/

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../shared/product.service';
import {Router} from '@angular/router';
import {Product} from '../../shared/product.interface';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router,
              private productService: ProductService) { }

  /******************************************************************************
   * Initializes one form group with two controls
   *****************************************************************************/
  ngOnInit(): void {
    const decimalPattern = '^\\d+(\\.\\d{1,2})?$';

    this.form = this.fb.group ({
      price: [null, Validators.compose([Validators.required,
                    Validators.pattern(decimalPattern)])],
      title: [null, Validators.compose([Validators.required])]
    });
  }

  createProduct(): void {
    // The 'as' keyword tells TypeScript to ignore type inference and consider,
    // in this case, an empty object named 'aProduct' as an object of type Product
    const aProduct = {} as Product;

    aProduct.price = this.form.controls.price.value;
    aProduct.title = this.form.controls.title.value;

    this.productService.createProduct(aProduct).subscribe(() => {
        console.log(aProduct);
        this.router.navigate(['/products']);
    }, err => {
      console.log(err);
    });
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }

  getPriceErrorMessage(): string {
    if (this.form.controls.price.hasError('pattern')) {
      return 'The price must be numeric';
    } else if (this.form.controls.price.hasError('required')) {
      return 'You must enter a value';
    } else {
      return '';
    }
  }

  getNameErrorMessage(): string {
    if (this.form.controls.title.hasError('required')) {
      return 'You must enter a value';
    } else {
      return '';
      }
  }
}
