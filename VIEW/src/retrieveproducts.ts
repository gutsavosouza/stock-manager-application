import { showNotification } from "./notification.js";
import Product from "./product";
// URL para fazer um request na API para retornar todos os protudos do banco de dados
const apiUrl:string = 'http://localhost:8080/products';

// função para realizar um request que retornar todos os produtos que estão presentes no banco de daddos
// os dados serão mostrados em uma tebela que deve estar presente no HTML da página
function displayAllProducts() : void {
    // recuperando o corpo da tabela, onde os produtos serão inseridos, e tratando o retorno da chamada
    const tableBody = document.getElementById('tableBody') as HTMLTableSectionElement;

    if(!tableBody) {
        console.log('No tbody element found in the html');
        return;
    }

    // Iniciando o request para recuperar os dados dos produtos
    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(response => {
        // tratando a status de resposta da API
        if(!response.ok) {
            throw new Error('API response was not OK');
            
        }
        return response.json();
    })
    .then((data: any)  => {
        // tratando a resposta da api

        // Aqui é feita a checagem se o o campo data do retorno da API está presente no objeto data que é recebido no request
        // checando se o mesmo é também um array de produtos
        if(!Array.isArray(data.data)){
            console.log(data);
            throw new Error('Data received in an unexpected format');
        }

        const products: Product[] = data.data;

        // limpando a tabela, para que não hajam resquícios de dados que não interessam ao usuário
        tableBody.innerHTML = '';

        // tratando o caso de que não hajam produtos no banco de dados
        if(products.length == 0) {
            tableBody.innerHTML = `
            <tr class="list-item">
                <th colspan=4>Sem produtos no banco de dados</th>
            </tr>`;
            return;
        }

        // iterando sobre o array de produtos
        products.forEach((product: Product) => {
            // para cada produto deveremos criar uma nova linha na tabela que terá presente os dados de nome, quantidade e descrição do produto
            // nessa linha também está presente o botão para deletar um produto

            // criando um elemento tr que será colocado no corpo da tabela
            const tableRow = document.createElement('tr') as HTMLTableRowElement;

            // criando o botão de deletar os produtos e sua coluna na tabela
            const deleteButtonTd = document.createElement('td');
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Deletar';
            deleteButton.classList.add('button', 'red');
            deleteButtonTd.appendChild(deleteButton);

            // adicionando a função de deletar o produto ao botão de deletar
            deleteButton.addEventListener('click', () => {
                deleteButton.style.display = 'none';
                const confirmButton = document.createElement('button');
                const cancelButton = document.createElement('button');

                confirmButton.classList.add('button', 'green');
                cancelButton.classList.add('button', 'red');

                confirmButton.style.padding = '6px';
                cancelButton.style.padding = '6px';

                confirmButton.style.marginRight = '5px';

                cancelButton.innerHTML = `
                    <i class="fa-solid fa-xmark"></i>
                `;

                confirmButton.innerHTML = `
                    <i class="fa-solid fa-check"></i>
                `;

                cancelButton.addEventListener('click', () => {
                    deleteButton.style.display = '';
                    confirmButton.style.display = 'none';
                    cancelButton.style.display = 'none';
                });

                confirmButton.addEventListener('click', () => {
                    // passando o ID do produto para a chamda do request de deletar um produto
                    deleteRequest(product.product_id); 
                    tableRow.remove();
                    if(tableBody.children.length === 0) {
                        tableBody.innerHTML = `
                            <tr class="list-item">
                                <th colspan=4>Sem produtos no banco de dados</th>
                            </tr>`;
                    }
                })

                deleteButtonTd.appendChild(confirmButton);
                deleteButtonTd.appendChild(cancelButton);
            });
            
            // criando as colunas onde estarão presentes os valores do produto e colocando seus valores respectivos
            const nameTd = document.createElement('td');
            nameTd.textContent = product.product_name;

            const quantityTd = document.createElement('td');
            quantityTd.textContent = `${product.product_quantity_in_stock}`;

            const descriptionTd = document.createElement('td');
            descriptionTd.textContent = product.product_description;

            // anexando as colunas dos dados e do botão deletar a linha criada
            tableRow.appendChild(nameTd);
            tableRow.appendChild(quantityTd);
            tableRow.appendChild(descriptionTd);
            tableRow.appendChild(deleteButtonTd);
            // por fim, adicionado a linha criada para o produto no corpo da tabela
            tableBody.appendChild(tableRow);
        })
    })
    .catch(error => {
        // tratando erros no request feito
        tableBody.innerHTML = `
            <tr class="list-item">
                <th colspan=4> Erro ao  buscar produtos no banco de dados</th>
            </tr>`;
        showNotification('Um erro ocorreu', 'red');
        // console.log('Error: ', error);
    })
}

// função assíncrona que realiza um request de deletar um produto baseado no seu ID 
async function deleteRequest(product_id: string) {
    await fetch(`${apiUrl}/${product_id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        })
        .then(response => {
            // tratando a respsota da API ao realizar o request de deletar um produto
            if(!response.ok) {
                showNotification('Erro ao deletar o produto', 'red');
                throw new Error('API response was not OK');
            } else {
                showNotification('Produto deletado com sucesso', 'green');
            }
            return response.json();
        })
        .catch(error => {
            // tratando erros no request
            // console.log('Error: ', error);
        })

        
}

// adicionndo a função de mostrar todos os produtos a pagina HTML
document.addEventListener('DOMContentLoaded', displayAllProducts);