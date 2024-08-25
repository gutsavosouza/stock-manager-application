// Interface para tipificar os produtos recebidos pela API, os campos da interface se referem aos campos de interesse que serão utilizados pela interface visual
interface Product {
    product_id: string;
    product_name: string;
    product_quantity_in_stock: number;
    product_description: string;
}

export default Product;