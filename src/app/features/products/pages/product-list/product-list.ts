import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, computed, signal } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { ProductCard } from '../../components/product-card/product-card';
import { CommonModule } from '@angular/common';

import { Product } from '../../models/product.model';
import { map } from 'rxjs';
import { SpinnerComponent } from "src/app/shared/components/spinner-component/spinner-component";

import { PaginationComponent } from 'src/app/shared/components/pagination-component/pagination-component';
@Component({
  selector: 'app-product-list',
  imports: [ProductCard, ReactiveFormsModule, FormsModule, CommonModule, SpinnerComponent,PaginationComponent],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  categories$ = this.productService.getCategories();
  search = signal('');
  selectedCategory = signal('');
  productsData = signal<Product[]>([]);
  totalProducts= signal(0);
  currentPage = signal(1);
  itemsPerPage = 10;
  totalPages = 0;

  filteredProducts = computed(() => {
    const searchValue = this.search().toLowerCase();
    const category = this.selectedCategory();
    return this.productsData().filter(
      p => p.title.toLowerCase().includes(searchValue) && (category ? p.category.name === category : true),
    );
  });

  onChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.selectedCategory.set(value);
  }

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
      this.loadTotalProducts();
      this.loadPage(this.currentPage() , this.itemsPerPage);


  }

  loadTotalProducts() {
  this.productService.getAllProducts().pipe(
    map(products => products.length)
  ).subscribe(total => {
    this.totalProducts.set(total);
    this.totalPages =  Math.ceil(this.totalProducts() / this.itemsPerPage)

  });
}

  loadPage(page: number , pageSize: number) {
    this.currentPage.set(page);
    this.itemsPerPage = pageSize;
    this.productService.getProducts(this.currentPage(), this.itemsPerPage).subscribe(res => {
      this.productsData.set(res);
    });
  }
    onPageChange(event: { page: number; pageSize: number; }) {
      this.loadPage(event.page, event.pageSize);
  }


}
