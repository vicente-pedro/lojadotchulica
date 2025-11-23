# 🛒 Loja do Tchulica – E-commerce de Celulares e Acessórios

Bem-vindo ao repositório da **Loja do Tchulica**, um e-commerce completo focado na venda de **celulares**, **fones**, **carregadores**, **cabos** e diversos **acessórios para smartphones**.

O projeto foi desenvolvido em **React + TypeScript + Vite**, utilizando Context API, componentes reutilizáveis e boas práticas modernas de desenvolvimento.

---
## ✨ Tecnologias Utilizadas

| Categoria | Tecnologia | Descrição |
|----------|------------|-----------|
| Framework | **React** | Biblioteca para construção da interface |
| Linguagem | **TypeScript** | Tipagem estática |
| Build Tool | **Vite** | Ferramenta de build rápida |
| Estilização | **CSS Modules** | Estilos isolados por componente |
| Estado Global | **React Context API** | Autenticação e carrinho |
| Lógica Reutilizável | **Custom Hooks** | Regras de negócio reaproveitáveis |

---
## 📦 Estrutura do Projeto

```
raiz do projeto/
├── public/
│   ├── images              # Imagens estáticas e ícones
├── src/
│   ├── assets/             # Imagens usadas no código
│   ├── components/         # Componentes reutilizáveis
│   │   ├── Header.tsx
│   │   ├── Header.css
│   │   ├── Footer.tsx
│   │   ├── Footer.css
│   │   ├── ProductCard.tsx
│   │   ├── ProductCard.css
│   │   ├── ScrollToTop.tsx
│   ├── context/            # Context API
│   │   ├── AuthContext.tsx
│   │   ├── CartContext.tsx
│   ├── data/               # Dados locais
│   │   ├── products.ts
│   ├── hooks/              # Hooks
│   │   ├── useFrete.ts
│   │   ├── useProducts.ts
│   ├── pages/              # Páginas principais
│   │   ├── Home.tsx
│   │   ├── Home.css
│   │   ├── Cart.tsx
│   │   ├── Cart.css
│   │   ├── ProductDetail.tsx
│   │   ├── ProuctDetail.css
│   │   ├── Admin.tsx
│   │   ├── Admin.css
│   │   ├── Auth.tsx
│   │   ├── Auth.css
│   │   ├── Login.tsx
│   │   ├── Login.css
│   │   ├── Products.tsx
│   │   ├── Products.css
│   │   ├── Register.tsx
│   │   ├── Register.css
│   ├── types/              # Tipagens
│   │   ├── frete.ts
│   │   ├── index.ts
│   ├── App.tsx             # Rotas e Providers
│   ├── App.css
│   ├── index.css     
│   ├── main.tsx            # Ponto de entrada
├── package.json
├── tsconfig.json
├── index.html
└── vite.config.ts

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
Clique no link abaixo para acessar a versão publicada no Netlify:

👉 https://lojadotchulica.netlify.app/
