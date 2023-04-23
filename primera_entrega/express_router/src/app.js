const express = require('express');
const productsRouter = require('./routes/products.routes');
const cartRouter = require('./routes/cart.routes');

const puerto = 3000;

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use('/api/products',productsRouter);
server.use('/api/cart',cartRouter);



server.listen (puerto, () => {

    console.log(`Servidor iniciado en puerto ${puerto}`)
}
)






