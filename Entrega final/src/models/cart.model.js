import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    productos: [
        {
            producto: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'productos' // Debe coincidir con la colección de productos
            },
            cantidad: { type: Number, required: true }
        }
    ]
});

const CartModel = mongoose.model('carts', cartSchema);
export default CartModel;
