/******************************************************************************
 * Title: product.service.ts
 * Author: Jeff Shepherd
 * Modified by:
 * Date: 10/28/2020
 * Description: product service
 *****************************************************************************/
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})

/******************************************************************************
 * All five of these functions return an Observable of type any. We use type
 * any because it will return either a BaseResponse object or an ErrorResponse
 * object.
 *****************************************************************************/
export class ProductService {

  constructor(private http: HttpClient) { }

  findAllProducts(): Observable<any> {
    return this.http.get('/api/product');
  }

  findProductById(productId: string): Observable<any> {
    return this.http.get('/api/product/' + productId);
  }

  createProduct(product: Product): Observable<any> {
    return this.http.post('/api/product', {
      // req body
      price: product.price,
      title: product.title
    });
  }

  updateProduct(productId: string, product: Product): Observable<any> {
    return this.http.put('/api/product/' + productId, {
      // req body
      price: product.price,
      title: product.title
    });
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete('/api/product/' + productId);
  }
}
