import express from 'express';
import ProductManager from '/fileManager/productManager.js';
import CartManager from '/fileManager/cartManager.js';

import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';  

const app = express();
const port = 8088;

// Middleware para permitir que la app reciba JSON
app.use(express.json());

// Usamos el router para manejar las rutas de productos
app.use('/api/products', productsRouter);

// Usamos el router para manejar las rutas de carritos
app.use('/api/carts', cartsRouter);  

// Iniciamos el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
