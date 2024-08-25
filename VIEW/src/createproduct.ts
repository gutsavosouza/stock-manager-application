import { showNotification } from "./notification.js";

// URL para fazer um request na API para criar um produto
const apiUrl : string = 'http://localhost:8080/products';

// Obtendo o formulario pelo ID e validando o retorno
const productForm= document.getElementById('productForm') as HTMLFormElement;

// Caso nao tenha sido encontrado o formulario na pagina retornar erro
if(!productForm) {
    console.log("Product form not found");
} else {
    // adicionando um evento a ação de enviar o formulário
    productForm.addEventListener('submit', (event) => {
        // evitando envios de resultados padroes
        event.preventDefault();

        // recuperando os input do formulario 
        const productNameInput  = document.getElementById('productName') as HTMLInputElement;
        const productStockQuantityInput = document.getElementById('quantityInStock') as HTMLInputElement;
        const productDescriptionInput = document.getElementById('productDescription') as HTMLInputElement;

        // checando os objetos recuperados, caso nao tenha sido possivel recuperar algum deles, retornar erro
        if(!productNameInput || !productStockQuantityInput || !productDescriptionInput) {
            console.log('Some error ocurred while fetching the HMTML elements')
            return;
        } else {
            // passando os valores dos inputs do formulário e guardando eles em um objeto que vai passado para o request
            const data = {
                product_name: productNameInput.value,
                product_quantity_in_stock: parseInt(productStockQuantityInput.value),
                product_description: productDescriptionInput.value
            };

            // Iniciando request a api, passando como paramentro a URL de request de criação de produto
            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                // Passando para o body do request os dados obtidos no formulário em formato JSON
                body: JSON.stringify(data)
            })
            .then(response => {
                // tratando o status da reposta da API
                if(!response.ok) {
                    throw new Error('API response was not OK');
                }
                return response.json();
            })
            .then(data => {
                // Tratando a resposta de retorno da API
                // console.log('Sucess: ', data);
                showNotification('Produto criado com sucesso', 'green');
                // resetando o formulario para facilitar para o usuario preencher algum outro produto que deseja criar
                productForm.reset();
            })
            .catch(error => {
                // Tratando erros obitidos durante o request
                // console.log('Error: ', error);
                showNotification('Um erro ocorreu', 'red');
            })
        }
    })
}