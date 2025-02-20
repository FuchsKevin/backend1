import userModel from './models/pro.model.js';
import mongoose from 'mongoose';
import productosModel from './models/productos.model.js';

const mongoURL = 'mongodb://127.0.0.1:27017/basededatosproductos';

const environment = async () => {
    await mongoose.connect(mongoURL);
    let productos = await productosModel.paginate(
        );
        
    console.log(productos);
}

environment();