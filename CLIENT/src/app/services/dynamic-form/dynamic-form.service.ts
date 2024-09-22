import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FieldConfig } from '../../interfaces/product-form';

@Injectable({
  providedIn: 'root'
})
export class DynamicFormService {

  constructor(private formBuilder: FormBuilder) { }

  createForm(fields: FieldConfig[]) : FormGroup {
    const formGroup = this.formBuilder.group({});

    fields.forEach(field => {
      const control = this.formBuilder.control(
        field.value || '',
        this.bindValidations(field.validatons || [])
      );
      formGroup.addControl(field.name, control);
    })

    return formGroup;
  }

  bindValidations(validations: any): any {
    if (validations.length > 0) {
      const validList = validations.map((valid: any) => {
        return valid.validator;
      });
      return Validators.compose(validList);
    }
    return null;
  }
}
