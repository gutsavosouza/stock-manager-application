import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule, Validators} from '@angular/forms'
import { FieldConfig } from '../../interfaces/product-form';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [DynamicFormComponent],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent {
  formFields: FieldConfig[] = [
    {
      name: 'productName',
      type: 'text',
      label: 'Nome do Produto',
      placeholder: 'Insira o nome do produto',
      validatons: [
        {
          name: 'required',
          validator: Validators.required,
          message: '*Nome do produto é obrigatório'
        }
      ]
    },
    {
      name: 'quantityInStock',
      type: 'number',
      label: 'Quantidade em estoque',
      placeholder: 'Insira a quantidade em estoque',
      validatons: [
        {
          name: 'required',
          validator: Validators.required,
          message: '*Quantidade em estoque do produto é obrigatória'
        },
        {
          name: 'min',
          validator: Validators.min(0),
          message: '*Valor mínimo para a quantidade em estoque é zero'
        }
      ]
    },
    {
      name: 'productDescription',
      type: 'textarea',
      label: 'Descrição do produto',
      placeholder: 'Insira a descrição do produto',
      validatons: [
        {
          name: 'required',
          validator: Validators.required,
          message: '*Descrição do produto é obrigatória'
        }
      ],
      rows: 4
    }
  ]
  
}
