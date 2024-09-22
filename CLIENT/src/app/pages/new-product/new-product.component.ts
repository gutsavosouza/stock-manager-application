import { Component } from '@angular/core';
import { ProductFormComponent } from '../../components/product-form/product-form.component';

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [ProductFormComponent],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent {
  
}
