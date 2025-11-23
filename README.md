# Front-End para Aplicação Spring

Este é um projeto front-end desenvolvido com Angular para gerenciar diversas entidades de um sistema de vendas, como clientes, produtos e vendas. O projeto utiliza Angular Material para os componentes de UI.

## 📜 Descrição

A aplicação consiste em uma interface para realizar operações de CRUD (Criar, Ler, Atualizar e Deletar) para as seguintes entidades:

- Bairros
- CEPs
- Cidades
- Clientes
- Marcas
- Produtos
- Ruas
- Sexos
- Tipos de Produto
- UFs (Estados)
- Vendas

## ✨ Funcionalidades

- Listagem e visualização das entidades.
- Criação de novos registros para cada entidade.
- Edição de registros existentes.
- Exclusão de registros.
- Interface reativa e amigável construída com Angular Material.

## 🚀 Tecnologias Utilizadas

- [Angular](https://angular.io/) (v20.2.0)
- [TypeScript](https://www.typescriptlang.org/) (v5.9.2)
- [Angular Material](https://material.angular.io/) (v20.2.0)
- [SCSS](https://sass-lang.com/) para estilização.
- [RxJS](https://rxjs.dev/) para programação reativa.

## ⚙️ Primeiros Passos

Siga as instruções abaixo para configurar e executar o projeto em seu ambiente de desenvolvimento.

### Pré-requisitos

Certifique-se de ter o [Node.js](https://nodejs.org/) (que inclui o npm) e o [Angular CLI](https://angular.io/cli) instalados em sua máquina.

- Node.js (versão recomendada: 20.x ou superior)
- Angular CLI (versão correspondente ao projeto: 20.2.1)

### Instalação

1.  Clone o repositório para a sua máquina local:
    ```sh
    git clone https://github.com/seu-usuario/front-end-angular.git
    ```
2.  Navegue até o diretório do projeto:
    ```sh
    cd front-end-angular
    ```
3.  Instale as dependências do projeto:
    ```sh
    npm install
    ```

## ▶️ Executando a Aplicação

Após a instalação das dependências, você pode iniciar o servidor de desenvolvimento.

```sh
npm start
```

O comando `npm start` (ou `ng serve`) compila a aplicação e a serve em `http://localhost:4200/`. A aplicação será recarregada automaticamente se você alterar qualquer um dos arquivos de origem.

## 📦 Build

Para criar uma versão de produção da aplicação, execute o seguinte comando:

```sh
npm run build
```

O comando `npm run build` (ou `ng build`) compila a aplicação para produção. Os artefatos da compilação serão armazenados no diretório `dist/`.

## ✅ Testes

Para executar os testes unitários via [Karma](https://karma-runner.github.io), utilize o comando:

```sh
npm test
```