import { Router } from 'express';
import CartManager from '../managers/cartManager.js';
import productosModel from '../models/productos.model.js';

const router = Router();
const cartManager = new CartManager();

// Obtener la vista del carrito
router.get('/', async (req, res) => {
    try {
        const carrito = await cartManager.getCarts();
        res.render('cart', { productos: carrito.productos || [] });
    } catch (error) {
        console.error('Error al obtener el carrito:', error);
        res.status(500).send('Error al obtener el carrito');
    }
});

// Agregar un producto al carrito
router.post('/:pid', async (req, res) => {
    try {
        const productId = req.params.pid;
        const producto = await productosModel.findById(productId);

        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        await cartManager.addProductToCart(producto._id); // Esto actualizará el carrito

        // Redirigir al carrito para ver los productos agregados
        res.redirect('/cart'); 
    } catch (error) {
        console.error('Error al agregar producto al carrito:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// Eliminar un producto específico del carrito
router.delete('/:pid', async (req, res) => {
    try {
        const productId = req.params.pid;
        await cartManager.removeProductFromCart(productId);
        res.json({ message: 'Producto eliminado del carrito' });
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// Vaciar el carrito
router.delete('/', async (req, res) => {
    try {
        await cartManager.clearCart();
        res.json({ message: 'Carrito vaciado' });
    } catch (error) {
        console.error('Error al vaciar el carrito:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

export default router;
