# 🛒 Loja do Tchulica – E-commerce de Celulares e Acessórios

Bem-vindo ao repositório da **Loja do Tchulica**, um e-commerce completo focado na venda de **celulares**, **fones**, **carregadores**, **cabos** e diversos **acessórios para smartphones**.

O projeto foi desenvolvido em **React + JavaScript + Vite**, utilizando Context API, componentes reutilizáveis e boas práticas modernas de desenvolvimento.

Desenvolvemos uma API utilizando JavaScript para disponibilizar e exibir os produtos da loja diretamente no site, permitindo a listagem dinâmica das informações como nome, preço e imagem dos produtos.

---
## Tecnologias Utilizadas

| Categoria | Tecnologia | Descrição |
|----------|------------|-----------|
| Framework | **React** | Biblioteca para construção da interface |
| Linguagem | **JavaScript** | Tipagem dinâmica |
| Build Tool | **Vite** | Ferramenta de build rápida |
| Estilização | **CSS Modules** | Estilos isolados por componente |
| Estado Global | **React Context API** | Autenticação e carrinho |
| Lógica Reutilizável | **Custom Hooks** | Regras de negócio reaproveitáveis |

---
### Tecnologias Utilizadas na API

| Categoria | Tecnologia / Pasta | Descrição |
|----------|---------------------|-----------|
| Backend | **server/** | Diretório principal da API desenvolvida |
| Controllers | **controllers/** | Controladores responsáveis pela lógica das rotas |
| Middleware | **middleware/** | Funções intermediárias para validações e segurança |
| Banco / Dados | **data/** | Arquivos de dados, conexões ou simulações de banco |
| Rotas | **routes/** | Definição das rotas da API |
| Servidor | **server.js** | Arquivo principal que inicializa o servidor |


---
## 📦 Estrutura do Projeto

```
raiz do projeto/
├── public/
│   ├── images              # Imagens estáticas e ícones
├── server/                 # API desenvolvida
│   ├── controllers/
│   ├── middleware/
│   ├── data/
│   ├── routes/
│   ├── server.js
├── src/
│   ├── assets/             # Imagens usadas no código
│   ├── components/         # Componentes reutilizáveis
│   │   ├── Header.jsx
│   │   ├── Header.css
│   │   ├── Footer.jsx
│   │   ├── Footer.css
│   │   ├── ProductCard.jsx
│   │   ├── ProductCard.css
│   │   ├── ScrollToTop.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   ├── CartContext.jsx
│   ├── data/               # Dados locais
│   │   ├── products.js
│   ├── hooks/              # Hooks
│   │   ├── useFrete.js
│   │   ├── useProducts.js
│   ├── pages/              # Páginas principais
│   │   ├── Home.jsx
│   │   ├── Home.css
│   │   ├── Cart.jsx
│   │   ├── Cart.css
│   │   ├── ProductDetail.jsx
│   │   ├── ProuctDetail.css
│   │   ├── Admin.jsx
│   │   ├── Admin.css
│   │   ├── Auth.jsx
│   │   ├── Auth.css
│   │   ├── Login.jsx
│   │   ├── Login.css
│   │   ├── Products.jsx
│   │   ├── Products.css
│   │   ├── Register.jsx
│   │   ├── Register.css
│   ├── types/              # Tipagens
│   │   ├── frete.js
│   │   ├── index.js
│   ├── App.jsx             # Rotas e Providers
│   ├── App.css
│   ├── index.css     
│   ├── main.jsx            # Ponto de entrada
├── package.json
├── tsconfig.json
├── index.html
└── vite.config.js

```

---
## 🚀 Como Rodar o Projeto

### Pré-requisitos
- Node.js
- npm
- Git

### 1. Clone o repositório
```bash
git clone https://github.com/vicente-pedro/loja-do-tchulica
````
### 2. Entre na pasta do projeto
```bash
cd loja-do-tchulica
```
### 3. Instale as dependências
```bash
npm install
```
### 4. Inicie o servidor de desenvolvimento
```bash
npm run dev
````
A aplicação rodará em:
👉 http://localhost:5173

---
## 💡 Funcionalidades

### 🛍️ Páginas
- Home  
- Lista de Produtos  
- Detalhes do Produto  
- Carrinho  
- Login  
- Cadastro  
- Painel Admin (Protegido)

### 🛒 Carrinho
- Adicionar itens  
- Remover itens  
- Atualizar quantidade  
- Calcular total  

### 🔐 Autenticação
- Login/Cadastro

### 📦 Produtos Tipados
- Tipagem completa via TypeScript

### 🚚 Cálculo de Frete
- Hook `useFrete()`  
- Simulação de frete baseada em valor e região  

---
## 🌎 Acesse o Site Online

A Loja do Tchulica já está disponível no ar!
Clique no link abaixo para acessar a versão publicada no Vercel:

👉 https://lojadotchulica.vercel.app/
