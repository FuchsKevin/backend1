import { Router } from 'express';
import CartManager from '../fileManager/cartManager.js';

const router = Router();
const cartManager = new CartManager();

// Ruta para agregar un nuevo carrito
router.post('/', async (req, res) => {
  try {
    const newCart = await cartManager.addCart(); // Llama al método para crear carrito
    res.status(201).json({ message: 'Carrito creado correctamente', cart: newCart });
  } catch (error) {
    console.error('Error al crear el carrito:', error); // Muestra errores
    res.status(500).json({ error: 'Error al crear el carrito' });
  }
});


// Ruta para agregar un producto a un carrito
router.post('/:cartId/products/:productId', async (req, res) => {
  try {
    const { cartId, productId } = req.params;
    const { quantity } = req.body; // Si deseas agregar un campo de cantidad

    // Lógica para agregar el producto al carrito
    const updatedCart = await cartManager.addProductToCart(Number(cartId), productId, quantity);

    res.status(200).json({
      message: 'Producto agregado al carrito',
      cart: updatedCart
    });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Error al agregar producto al carrito' });
  }
});


// Ruta para obtener todos los carritos
router.get('/', async (req, res) => {
  try {
    const carts = await cartManager.getCarts();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los carritos' });
  }
});

export default router;
