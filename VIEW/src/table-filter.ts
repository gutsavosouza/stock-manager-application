import { showNotification } from "./notification.js";
// esse código se refere ao filtro da tabela de proodutos
// ao digitar algo no input presente na página de produtos é realizada uma busca nos dados presentes na tabela de produtos para checar se existe algum valor na tabela
// que contém o valor do input

// recuperando o elemento de input  e tratando o retorno
const filterInput = document.getElementById('filterInput') as HTMLInputElement;

if(!filterInput) {
    console.log('Erro while fetching input filter element in the HTML');
} else {
    // adicionado uma função que realizará a busca na tabela
    filterInput.addEventListener('input', function () {
        // variável que marca a quantidade de resultados obitos na busca
        let resultsCount: number = 0;
        // variavel que armazena o valor digitado no input em Upper Case para que a filtragem seja independente da capitalização do input
        let filter = filterInput.value.toUpperCase();

        // recupeando o relemento do corpo da tabela e tratando o retorno
        const tableBody = document.getElementById('tableBody') as HTMLTableSectionElement;
        if(!tableBody) {
            console.log('Erro while feteching table body element from HTML');
            return;
        }
        // recuperando todos os elementos <tr> do corpo da tabela, ou seja, recuperando todas as linhas com dados de produtos da tabela
        const trCollection = tableBody.getElementsByTagName('tr') as HTMLCollectionOf<HTMLTableRowElement>;

        // checando se há linhas para iterar sobre
        if(trCollection.length > 0) {
            // iterando sobre as linhas da tabela
            for(let i = 0; i < trCollection.length; i++){
                // obtendo todos os elementos <td> daquela linha
                let td = trCollection[i].getElementsByTagName('td');
                let rowMatches = false;
                // iterando sobre os elementos td da linha
                // pulando o último elemento visto que o mesmo é o botão de deletar produtos
                for(let j = 0; j < td.length -1; j++) {
                    // checando se há conteúdo no elemento em questão e tratando
                    let tdTextContent = td[j].textContent;
                    if(!tdTextContent) {
                        console.log('Erro while feteching td texto content')
                        return;
                    } else {
                        // realizando a comparação do valor presente no input com o valor presente no elemento <td>
                        if(tdTextContent.toUpperCase().indexOf(filter) > -1){
                            resultsCount++;
                            rowMatches = true;
                            break;
                        };
                    }
                }
                // se houve algum match na comparação mostrar o match, caso contrário esconder da tabela, fitlrando os resultados
                if(rowMatches){
                    trCollection[i].style.display = 'table-row';
                } else {
                    trCollection[i].style.display = 'none';
                }
            }
            // checando se a quantidade de resultados foi zero, e trantando o caso
            if(resultsCount === 0) {
                showNotification('Produto não encontrado', 'red');
            }
        } else {
            console.log('No elements to iterate in table');
            return;
        }
    })
}