const express = require('express');
const app = express();
const cors = require('cors');
const { query } = require('./database');

app.use(express.json());
app.use(cors());

// Ruta GET para obtener productos
app.get('/productos', async (req, res) => {
  try {
    const rows = await query('SELECT * FROM products');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

// Ruta POST para subir un producto
app.post('/productos', async (req, res) => {
  const { name, price } = req.body;
  const values = [name, price];

  try {
    await query('INSERT INTO products (name, price) VALUES (?, ?)', values);
    res.status(201).json({ message: 'Producto subido exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al subir el producto' });
  }
});

app.listen(3000, () => {
  console.log('Escuchando en puerto 3000');
});
