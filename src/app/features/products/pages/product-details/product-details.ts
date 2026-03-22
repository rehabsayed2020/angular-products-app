import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { ProductService } from '../../services/product-service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-details',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],

  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {

    product$:Observable<Product> = this.route.params.pipe(
    switchMap(params => this.productService.getProduct(params['id']))
  );

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}
}
