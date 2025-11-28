const { v4: uuidv4 } = require('uuid');
const store = require('../data/store');

async function getAll(req, res, next) {
  try {
    const products = await store.read();
    res.json(products);
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const products = await store.read();
    const p = products.find(x => x.id === req.params.id);
    if (!p) return res.status(404).json({ error: 'Produto não encontrado' });
    res.json(p);
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const { name, price, description } = req.body;
    if (!name || typeof name !== 'string') return res.status(400).json({ error: 'Nome inválido' });
    const products = await store.read();
    const product = { id: uuidv4(), name, price: Number(price) || 0, description: description || '' };
    products.push(product);
    await store.write(products);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const { id } = req.params;
    const { name, price, description } = req.body;
    const products = await store.read();
    const idx = products.findIndex(x => x.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Produto não encontrado' });
    const updated = Object.assign(products[idx], {
      name: name ?? products[idx].name,
      price: price !== undefined ? Number(price) : products[idx].price,
      description: description ?? products[idx].description
    });
    products[idx] = updated;
    await store.write(products);
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const { id } = req.params;
    const products = await store.read();
    const idx = products.findIndex(x => x.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Produto não encontrado' });
    const deleted = products.splice(idx, 1)[0];
    await store.write(products);
    res.json(deleted);
  } catch (err) {
    next(err);
  }
}

module.exports = { getAll, getById, create, update, remove };
