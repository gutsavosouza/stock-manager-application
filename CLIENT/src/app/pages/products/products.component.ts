import { Component, ViewChild } from '@angular/core';
import { ProductsTableComponent } from '../../components/products-table/products-table.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { NotificationComponent } from '../../components/notification/notification.component';
import Product from '../../interfaces/product';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductsTableComponent, NotificationComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  @ViewChild('products') productsTable?: ProductsTableComponent;
  title = 'Produtos';

  filteredProducts?: Product[] = [];
  

  searchQuery: string = 'caixa';

  filterProducts() {
    const products = this.productsTable?.products;
    const query: string = this.searchQuery.toLowerCase();
    
    if(products){
      this.filteredProducts = products.filter(product =>
        product.product_name.toLowerCase().includes(query)
      );
    }

  }
}