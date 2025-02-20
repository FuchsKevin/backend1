import CartModel from '../models/cart.model.js';
import mongoose from 'mongoose';

class CartManager {
    async getCarts() {
        try {
            // Buscar el carrito y poblar la información de los productos
            let carrito = await CartModel.findOne().populate('productos.producto').lean();
            if (!carrito) {
                carrito = await CartModel.create({ productos: [] }); // Si no existe, crear uno
            }
            return carrito;
        } catch (error) {
            console.error('Error al obtener el carrito:', error);
            return { productos: [] };
        }
    }

    async addProductToCart(productId) {
        try {
            let carrito = await CartModel.findOne();
            if (!carrito) {
                carrito = new CartModel({ productos: [] });
            }
    
            const index = carrito.productos.findIndex(p => p.producto.toString() === productId);
    
            if (index !== -1) {
                carrito.productos[index].cantidad += 1;
            } else {
                carrito.productos.push({ producto: productId, cantidad: 1 });
            }
    
            // Asegúrate de actualizar el carrito correctamente
            await carrito.save(); // Aquí se guarda el carrito
            console.log("Carrito actualizado:", carrito);
        } catch (error) {
            console.error('Error al agregar producto al carrito:', error);
        }
    }
}

export default CartManager;
