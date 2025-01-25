import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta del archivo JSON
const PRODUCTS_FILE = path.resolve(__dirname, 'products.json'); // Ruta al archivo de productos

// Función para leer los productos desde el archivo
const readProductsFromFile = async () => {
  try {
    const data = await fs.promises.readFile(PRODUCTS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error al leer los productos del archivo:', error);
    return []; // Si hay un error, devolvemos un array vacío
  }
};

// Función para escribir los productos en el archivo
const writeProductsToFile = async (products) => {
  try {
    await fs.promises.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error al escribir los productos al archivo:', error);
  }
};

class ProductManager {
  // Método para agregar un producto
  async addProduct(product) {
    const products = await readProductsFromFile();

    // Validar que el producto tenga un ID único
    if (products.find((p) => p.id === product.id)) {
      throw new Error('El producto con este ID ya existe');
    }

    products.push(product);
    await writeProductsToFile(products);
    return product;
  }

  // Método para obtener todos los productos
  async getProducts() {
    return await readProductsFromFile();
  }

  // Método para modificar un producto
  async modifyProduct(productId, updatedProduct) {
    const products = await readProductsFromFile();

    // Encontrar el producto a modificar
    const productIndex = products.findIndex((p) => p.id === productId);
    if (productIndex === -1) {
      throw new Error('Producto no encontrado');
    }

    // Modificar el producto
    products[productIndex] = { ...products[productIndex], ...updatedProduct };

    // Guardar los productos actualizados en el archivo
    await writeProductsToFile(products);

    return products[productIndex]; // Devolver el producto actualizado
  }

  // Método para eliminar un producto
  async deleteProduct(productId) {
    const products = await readProductsFromFile();

    // Filtrar el producto a eliminar
    const filteredProducts = products.filter((p) => p.id !== productId);
    if (filteredProducts.length === products.length) {
      throw new Error('Producto no encontrado');
    }

    // Guardar la lista de productos actualizada
    await writeProductsToFile(filteredProducts);

    return { message: 'Producto eliminado correctamente' }; // Mensaje de éxito
  }
}

export default ProductManager;
