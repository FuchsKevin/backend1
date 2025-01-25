import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta del archivo JSON del carrito
const CARTS_FILE = path.resolve(__dirname, '..', 'fileManager', 'carts.json');
console.log('Ruta de archivo de carritos:', CARTS_FILE);




// Función para leer los carritos desde el archivo
const readCartsFromFile = async () => {
  try {
    const data = await fs.promises.readFile(CARTS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error("Error al leer los carritos del archivo:", error);
    return []; // Si hay un error, devolvemos un array vacío
  }
};

// Función para escribir los carritos en el archivo
const writeCartsToFile = async (carts) => {
  console.log('writeCartsToFile llamado con los datos:', carts);
  try {
    await fs.promises.writeFile(CARTS_FILE, JSON.stringify(carts, null, 2), 'utf-8');
    console.log('Carritos guardados correctamente');
  } catch (error) {
    console.error("Error al escribir los carritos al archivo:", error);
    throw new Error('No se pudo guardar el archivo de carritos');
  }
};



class CartManager {
  // Método para agregar un carrito
  async addCart() {
    const carts = await readCartsFromFile();
    const newCart = { id: carts.length + 1, products: [] }; // Crea un carrito básico
    carts.push(newCart); // Agrega el nuevo carrito
    await writeCartsToFile(carts); // Guarda los carritos en el archivo
    return newCart; // Retorna el nuevo carrito
  }


  // Método para obtener todos los carritos
  async getCarts() {
    return await readCartsFromFile();
  }
  async addProductToCart(cartId, productId) {
    const carts = await readCartsFromFile(); // Carga los carritos desde el archivo
    const cart = carts.find((c) => c.id === cartId); // Busca el carrito por ID

    if (!cart) {
      throw new Error(`Carrito con ID ${cartId} no encontrado`);
    }

    // Busca si el producto ya existe en el carrito
    const productInCart = cart.products.find((p) => p.productId === productId);

    if (productInCart) {
      // Si existe, incrementa la cantidad
      productInCart.quantity += 1;
    } else {
      // Si no existe, agrégalo con cantidad 1
      cart.products.push({ productId, quantity: 1 });
    }

    // Guarda los cambios en el archivo
    await writeCartsToFile(carts);

    return cart; // Retorna el carrito actualizado
  }


  // Método para agregar un producto a un carrito
async addProductToCart(cartId, productId) {
  const carts = await readCartsFromFile(); // Carga los carritos desde el archivo
  const cart = carts.find((c) => c.id === cartId); // Busca el carrito por ID

  if (!cart) {
    throw new Error(`Carrito con ID ${cartId} no encontrado`);
  }

  // Busca si el producto ya existe en el carrito
  const productInCart = cart.products.find((p) => p.productId === productId);

  if (productInCart) {
    // Si existe, incrementa la cantidad
    productInCart.quantity += 1;
  } else {
    // Si no existe, agrégalo con cantidad 1
    cart.products.push({ productId, quantity: 1 });
  }

  // Guarda los cambios en el archivo
  await writeCartsToFile(carts);

  return cart; // Retorna el carrito actualizado
}
}
  





export default CartManager;
