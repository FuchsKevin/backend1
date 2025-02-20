import express from 'express';
//import ProductManager from './fileManager/productManager.js';
//import CartManager from './fileManager/cartManager.js';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';


//import productsRouter from './routes/products.router.js';
//import cartsRouter from './routes/carts.router.js';  
import viewsrouter from './routes/views.router.js';

const app = express();
const port = 8088;


// Middleware para permitir que la app reciba JSON
//app.use(express.json());

// Usamos el router para manejar las rutas de productos
//app.use('/api/products', productsRouter);

// Usamos el router para manejar las rutas de carritos
//app.use('/api/carts', cartsRouter);  

//configurar motor de plantillas 

app.engine('handlebars', handlebars.engine());
app.set('view', __dirname + '/views');
app.set('views engine', 'handlebars');

//cargamos la carpeta public como nuestra carpeta de archivos estaticos
app.use(express.static(__dirname + '/public'));

//usamos el enrutador para las vistas 

app.use ('/', viewsrouter);
// Iniciamos el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);

});




