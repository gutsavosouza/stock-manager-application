# stock-manager-app
Aplicativo simples dividido em duas partes: API e Interface
- Uma API dockerizada simples que gerencia um banco de dados para o gerenciamento de produtos e vendas dos mesmos
- A interface faz o consumo da API e disponibiliza as informações para o usuário

![Página inicial da aplicação](./VIEW/main-page.png)

## Rodando a aplicação

### Pre-requisitos
- [Node.js](https://nodejs.org/en/download/) (v18.19.1 ou maior)
- [NPM](https://nodejs.org/en/download/package-manager) (v1.22.22 ou maior)
- [Docker (opcional)](https://www.docker.com/products/docker-desktop) (v27.1.2 ou maior)
- [Docker Compose (opcional)](https://docs.docker.com/compose/install/) (v2.28.1 ou maior)
- [PostgreSQL](https://www.postgresql.org/download/) (v16  ou maior)
- [Angular](https://angular.dev/) (v18.2.5 ou maior)

### Instalação

#### API
Para subir o servidor da API, você precisa entrar no diretório API e executar os comandos:
1. Para instalar todas as dependências da API:
    ```
    npm install
    ```

2. Configurar o seu arquivo .env. O arquivo .env deve está de acordo com o arquivo .env.model presente no diretório da API desse repositório.
   
3. Executar as migrações do banco de dados para que o mesmo esteja disponível localmente executando o comando:
    ```
    npm run migrate
    ```

4. Subir o servidor utilizando o comando:
    ```
    npm run dev
    ```
5. Se você possui Docker instalado em sua máquina e está utilizando um sistema Linux você pode rodar os seguintes comandos para subir a API. Para dar permissões ao arquivo "entrypoint.sh":
   ```
    npm run setup
   ```
   Para subir os containers do banco de dados e da API:
   ```
    npm run start
   ```
   Para fechar os containers:
   ```
    npm run stop
   ```

#### Interface
Para subir o servidor da interface, você precisa entrar no diretório CLIENT e executar os comandos:
1. Para instalar todas as dependências da interface:
    ```
    npm install
    ```
2. Para rodar a aplicação utiliza algum dos comandos abaixo, no diretório CLIENT:
    ```
    npm run start
    ```
    ```
    ng serve
    ```

### Planos futuros
Alguns pontos da aplicação ainda estão em desenvolvimento:
- Vendas ainda não foram implemenentdas na interface da aplicação
- Dashboard ainda não foi implementado na API e na interface
- Sistema de autenticação para uso da API
- Sistema de login e cadastro para uso da interface