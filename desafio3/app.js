
const express = require ('express');
const ProductManager = require('./product_manager');

// CREAMOS EL PUERTO

const puerto = 8080;


const manager = new Product ('./products.json');
server.use(express.json);
const server = express();

// UTILIZO GET CON UN ENDPOINT
server.get('/', (req,res)=>{
    console.log('Server response');
    res.send('Servidor Express');
});

server.get('/products', (req,res)=>{
    const verProductId = manager.getProductsById(req.params.pid);
    res.send(manager.getProducts());
    res.send(verProductId);
});


server.get('/products/:pid', (req,res)=>{
    
    let limit = parseInt(req.query.limit)
    const productosLimitados = productos.slice(0,limit);
    res.send(productosLimitados);
    
})

