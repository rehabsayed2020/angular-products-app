import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private cache$?: Observable<any[]>;

  constructor(private http: HttpClient) {}

  getProducts(currentPage: number, itemsPerPage: number) {
    return this.http.get<Product[]>(`/products?limit=${itemsPerPage}&offset=${currentPage}`).pipe(shareReplay(1));
  }

  getAllProducts() {
    if (!this.cache$) {
      this.cache$ = this.http.get<Product[]>('/products').pipe(shareReplay(1));
    }
    return this.cache$;
  }

  getCategories() {
    return this.http.get<any[]>('/categories').pipe(map(categories => categories.map(c => c.name)));
  }

  getProduct(id: number) {
    return this.http.get<Product>(`/products/${id}`);
  }
}
