# 🚀 Zela App

Bem-vindo ao repositório do **Zela App**! Este é um projeto full-stack desenvolvido com **Angular** no frontend e **Node.js/Express** no backend, utilizando **MongoDB** como banco de dados. O projeto também está configurado para rodar facilmente com **Docker**.

## 📋 Sobre o Projeto

O Zela App é uma plataforma para gerenciamento e visualização de ocorrências (Zelas), permitindo que usuários relatem e acompanhem problemas na comunidade.

## 🛠️ Tecnologias Utilizadas

### Frontend (`/client`)
- **Framework:** Angular
- **Estilização:** Tailwind CSS
- **Linguagem:** TypeScript

### Backend (`/server`)
- **Runtime:** Node.js
- **Framework:** Express
- **Banco de Dados:** MongoDB (com Mongoose)
- **Autenticação:** JWT (JSON Web Tokens)
- **Linguagem:** TypeScript

### Infraestrutura
- **Containerização:** Docker & Docker Compose

## ⚙️ Pré-requisitos

Para rodar este projeto localmente, você precisará ter instalado:

- [Node.js](https://nodejs.org/) (v18+ recomendado)
- [Docker](https://www.docker.com/) e Docker Compose (Opcional, mas recomendado)
- [MongoDB](https://www.mongodb.com/) (Se rodar sem Docker)

## 🚀 Como Rodar o Projeto

### Opção 1: Usando Docker (Recomendado)

A maneira mais fácil de rodar todo o ambiente (Frontend + Backend + Banco de Dados) é utilizando o Docker Compose.

1.  Certifique-se de que o Docker está rodando.
2.  Na raiz do projeto, execute:

    ```bash
    docker-compose up -d --build
    ```

3.  Acesse a aplicação:
    - **Frontend:** http://localhost:80
    - **Backend API:** http://localhost:3000
    - **MongoDB:** localhost:27017

### Opção 2: Rodando Manualmente (Desenvolvimento Local)

#### 1. Configurando o Backend

1.  Navegue até a pasta do servidor:
    ```bash
    cd server
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Configure as variáveis de ambiente. Crie um arquivo `.env` na pasta `server` com o seguinte conteúdo (ajuste conforme necessário):
    ```env
    PORT=3000
    MONGO_URI=mongodb://localhost:27017/zelamorato
    JWT_SECRET=seu_segredo_jwt_super_seguro
    JWT_EXPIRES_IN=1d
    NODE_ENV=development
    ```
4.  Inicie o servidor em modo de desenvolvimento:
    ```bash
    npm run dev
    ```
    O servidor estará rodando em `http://localhost:3000`.

#### 2. Configurando o Frontend

1.  Navegue até a pasta do cliente (em um novo terminal):
    ```bash
    cd client
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Inicie a aplicação Angular:
    ```bash
    npm start
    ```
    A aplicação estará rodando em `http://localhost:4200` (porta padrão do Angular CLI).

## 📂 Estrutura de Pastas

```
zela-app/
├── client/             # Código fonte do Frontend (Angular)
│   ├── src/
│   ├── angular.json
│   ├── tailwind.config.js
│   └── ...
├── server/             # Código fonte do Backend (Node.js/Express)
│   ├── src/
│   │   ├── config/     # Configurações (DB, Env)
│   │   ├── controllers/# Controladores da API
│   │   ├── models/     # Modelos Mongoose
│   │   ├── routes/     # Rotas da API
│   │   └── server.ts   # Ponto de entrada
│   └── ...
├── docker-compose.yml  # Orquestração dos containers
└── README.md           # Documentação do projeto
```

## 📝 Scripts Disponíveis

### Server (`/server`)
- `npm run dev`: Inicia o servidor com nodemon (reinício automático).
- `npm run build`: Compila o TypeScript para JavaScript (pasta `/dist`).
- `npm start`: Inicia o servidor compilado (produção).

### Client (`/client`)
- `npm start`: Inicia o servidor de desenvolvimento (`ng serve`).
- `npm run build`: Compila a aplicação para produção.
- `npm test`: Executa os testes unitários via Vitest.

---
Desenvolvido para o projeto **Zela App**.
