import { Component, OnInit, Input, ViewChild, inject } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { FieldConfig } from '../../interfaces/product-form';
import { DynamicFormService } from '../../services/dynamic-form/dynamic-form.service';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from '../notification/notification.component';
import { ProductService } from '../../services/product/product.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, NotificationComponent, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './dynamic-form.component.html',
  styleUrls: [
    './dynamic-form.component.css'
  ]
})
export class DynamicFormComponent implements OnInit{
  @ViewChild('notification') notification !: NotificationComponent;
  @Input() fields: FieldConfig[] = [];
  form: FormGroup;
  formTitle = 'Titulo do formulário'
  productService: ProductService = inject(ProductService);

  constructor(private formService: DynamicFormService) {
    this.form = formService.createForm(this.fields);
  }

  ngOnInit(): void {
    this.form = this.formService.createForm(this.fields);    
  }

  onSubmit() {

    if(this.form.valid) {
      this.productService.createProduct(this.form.value.productName, this.form.value.quantityInStock, this.form.value.productDescription)
      .then(response => {
        this.notification.show('Sucesso ao cadastrar produto', 2500);
        this.form.reset();
      })
      .catch(error => {
        this.notification.show('Erro ao cadastrar produto', 2500);
      });
     
    } else {
      this.notification.show('Alguns campos não são válidos', 2500);
    }
  }


}
