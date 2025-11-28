const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const productsRouter = require('./routes/products');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

app.use('/api/products', productsRouter);

app.use((req, res) => res.status(404).json({ error: 'Not found' }));

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
