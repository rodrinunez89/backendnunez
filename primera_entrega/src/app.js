import express from "express";
import productsRouter from './routes/products.routes.js';
import cartRouter from './routes/cart.routes.js';
import { __dirname } from "./utils.js";

const puerto = 3000;

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use('/api/products',productsRouter);
server.use('/api/carts',cartRouter);





server.listen (puerto, () => {

    console.log(`Servidor iniciado en puerto ${puerto}`)
}
)






