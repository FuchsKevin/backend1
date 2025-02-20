import { Router } from 'express';
import ProductManager from '../fileManager/productManager.js';


const router = Router();
const productManager = new ProductManager();

// Ruta para obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

// Ruta para agregar un nuevo producto
router.post('/', async (req, res) => {
  try {
    const newProduct = req.body;
    const addedProduct = await productManager.addProduct(newProduct);
    res.status(201).json({ message: 'Producto agregado correctamente', product: addedProduct });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Error al agregar el producto' });
  }
});

// Ruta para modificar un producto
router.put('/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const updatedProduct = req.body;
    const modifiedProduct = await productManager.modifyProduct(Number(productId), updatedProduct);
    res.status(200).json({ message: 'Producto modificado correctamente', product: modifiedProduct });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Error al modificar el producto' });
  }
});

// Ruta para eliminar un producto
router.delete('/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const response = await productManager.deleteProduct(Number(productId));
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Error al eliminar el producto' });
  }
});

export default router;
