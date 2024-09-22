import { Component, inject, OnInit, ViewChild } from '@angular/core';
import Product from '../../interfaces/product';
import { ProductService } from '../../services/product/product.service';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from '../notification/notification.component';
import { FormsModule } from '@angular/forms';
import { MatPaginator, PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { filter } from 'rxjs';

@Component({
  selector: 'app-products-table',
  standalone: true,
  imports: [CommonModule, NotificationComponent, FormsModule, MatPaginatorModule],
  templateUrl: './products-table.component.html',
  styleUrl: './products-table.component.css'
})
export class ProductsTableComponent implements OnInit{
  @ViewChild('notification') notification !: NotificationComponent;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  products: Product[] = [];
  productService: ProductService = inject(ProductService);

  filteredProducts: Product[] = [];
  searchQuery: string = '';

  selectedProductIdForDeletion: string | null = null;
  showConfirmButtons: boolean = false;

  pageSize: number = 5;
  pageIndex: number = 0;
  paginatedProducts: Product[] = [];

  ngOnInit(): void {
      this.filteredProducts = this.products;
  }

  constructor() {
    this.loadProducts();
  }


  loadProducts() {
    this.productService.getAllProducts().then((products: Product[]) => {
      this.products = products;
      this.filteredProducts = products;
      this.filterProducts();
      this.updatePaginatedProducts();
    }).catch(error => {
      this.notification.show('Um erro aconteceu, tente mais tarde', 3000);
    });
  }

  onDeleteClick(product_id: string) {
    this.selectedProductIdForDeletion = product_id;
  }

  onCancelClick() {
    this.selectedProductIdForDeletion = null;
  }

  onConfirmClick(product_id: string) {
    this.productService.deleteProduct(product_id).then(() => {
      this.loadProducts();
      this.selectedProductIdForDeletion = null;
      this.notification.show('Produto deletado com sucesso', 2500);
      this.paginator.firstPage();
    }).catch(error => {
      console.error('Error deleting product:');
      this.notification.show('Erro ao deletar o produto', 2500)
    });
  }

  filterProducts() {
    const query = this.searchQuery.toLowerCase();

    this.filteredProducts = this.products.filter(product =>
      product.product_name.toLowerCase().includes(query)
    );

    this.paginator.firstPage();
    this.updatePaginatedProducts();
  }

  handlePageEvent(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedProducts();
  }

  updatePaginatedProducts() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedProducts = this.filteredProducts.slice(startIndex, endIndex);
  }
}
