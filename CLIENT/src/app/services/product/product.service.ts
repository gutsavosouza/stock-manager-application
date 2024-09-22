import { Injectable } from '@angular/core';
import Product from '../../interfaces/product';
import axios from 'axios';
import { url } from 'inspector';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  api_url = 'http://localhost:8080/products';

  constructor() { }

  async getAllProducts(): Promise<Product[]> {
    const data: Product[] = await axios.get(this.api_url)
    .then(response => {
      // console.log(response.data.data)  
      return response.data.data;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      throw error;
    });

    // console.log(data);

    return data;
  }

  async getProductByID(product_id: number): Promise<Product> {
    const data =  await axios.get(`${this.api_url}/${product_id}`)
    .then(response => {
      // console.log(response.data)
      return response.data;
    })
    .catch(error => {
      console.error('Error fetching data');
      throw error;
    });

    return data;
  }

  async deleteProduct(product_id: string): Promise<boolean> {
    const result: boolean = await axios.delete(`${this.api_url}/${product_id}`)
    .then(response => {
      if(response.status == 200) return true;
      else {
        return false;
      }
    })
    .catch(error => {
      console.error('Error deleting the product');
      throw error;
    });

    return result;
  }

  async createProduct(product_name: string, product_quantity_in_stock: number, product_description: string) {
    const data = {
      product_name: product_name,
      product_quantity_in_stock: product_quantity_in_stock,
      product_description: product_description
    }

    await axios.post(this.api_url, data)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log('An error ocurred.');
      throw error;
    })
  }
}
