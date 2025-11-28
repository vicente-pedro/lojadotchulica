# Tchulica API (CRUD) - Persistente

API simples em JavaScript (Node + Express) que implementa um CRUD de produtos com armazenamento em `server/data/products.json`.

## Instalação
No diretório `server` rode:

```powershell
npm install
```

Rodar em desenvolvimento (com reinício automático):

```powershell
npm run dev
```

Rodar em produção:

```powershell
npm start
```

## Observações
- Os dados são persistidos em `server/data/products.json`.
- Para resetar os dados, edite ou substitua o arquivo `products.json`.

## Validação de entrada
As rotas de criação e atualização usam `express-validator`. Se houver erros de validação, a API responde com `400` e um JSON com a lista de campos e mensagens, por exemplo:

```json
{
	"errors": [
		{ "field": "name", "msg": "Nome é obrigatório" }
	]
}
```

