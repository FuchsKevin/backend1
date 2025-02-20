import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import viewsRouter from './routes/views.router.js';
import __dirname from './utils.js';
import cartsRouter from './routes/carts.router.js';

const mongoURL = 'mongodb://127.0.0.1:27017/basededatosproductos';
const environment = async () => {
    await mongoose.connect(mongoURL);
}

environment();

//Inicializo la constante app para utilizar express
const app = express();

//Configuro mi servidor para trabajar con json
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Inicializo mi motor de plantillas y lo configuro
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

app.listen(8080, () => console.log("Listening on port 8080"));