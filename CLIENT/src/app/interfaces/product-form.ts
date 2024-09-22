export interface FieldConfig {
    label: string;
    type: string;
    name: string;
    placeholder: string;
    value?: any;
    validatons?: Validation[];
    rows?: number;
}

export interface Validation {
    name: string;
    validator: any;
    message: string;
}