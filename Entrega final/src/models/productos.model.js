import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productosCollection = 'productos';

const productosSchema = mongoose.Schema({
    nombre: String,
    categoria: String,
    precio: Number,
    cantidad: Number
});

productosSchema.plugin(mongoosePaginate);

const productosModel = mongoose.model(productosCollection, productosSchema);

export default productosModel;
