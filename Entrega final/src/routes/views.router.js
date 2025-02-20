import { Router } from 'express';
import productosModel from '../models/productos.model.js';
import CartManager from '../managers/cartManager.js';
import { get } from 'mongoose';

const router = Router();
const cartManager = new CartManager();

// Ruta para la página principal con productos
router.get('/', async (req, res) => {
    let pageActual = req.query.page || 1;
    let limitActual = req.query.limit || 10;
    let { sort } = req.query; // Obtener el parámetro sort de la URL
    let sortOption = {};

    // Verificar si sort es 'asc' o 'desc' y aplicar el ordenamiento
    if (sort === 'asc') {
        sortOption.precio = 1; // Orden ascendente
    } else if (sort === 'desc') {
        sortOption.precio = -1; // Orden descendente
    }
     
    let infopaginate = await productosModel.paginate(
        { categoria: "Accesorios" },
        { limit: limitActual, page: pageActual, sort: sortOption }
    );

    console.log(infopaginate);

    let productosobjet = infopaginate.docs.map(doc => doc.toObject());

    res.render('index', { info: infopaginate, productos: productosobjet });
});

// 🔹 **Nueva Ruta para Renderizar el Carrito**
router.get('/cart', async (req, res) => {
    try {
        const carrito = await cartManager.getCarts(); // Obtiene el carrito
        res.render('cart', { productos: carrito.productos || [] }); // Renderiza 'cart.handlebars'
    } catch (error) {
        console.error('Error al obtener el carrito:', error);
        res.status(500).send('Error al obtener el carrito');
    }
});

export default router;
