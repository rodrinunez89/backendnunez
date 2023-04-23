const express = require('express');
const uploader = require('../productManager/product_manager');

const router = express.Router();




router.get('/', (req, res) => {
    //cuerpo de la base de datos
    res.status(200).send({estado: 'ok' , mensaje: 'Cart'})
})



module.exports = router;
