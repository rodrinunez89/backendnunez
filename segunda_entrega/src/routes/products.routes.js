import { Router } from "express";
import ProductManager from "../productManager/product_manager.js";
import { __dirname } from "../utils.js";




const router = Router();
const productManager = new ProductManager(`${__dirname}/productManager/products.json`);

const productRoutes = (io) => {
    router.get('/products_index', async (req, res) => {
        const products = await manager.getProducts();
        res.render('index_products', {
            products: products
        });
    });

router.get('/', (req,res)=>{
    let limit = parseInt(req.query.limit)
    productManager.getProducts().then((products)=>{
        if(limit){
            products = products.slice(0,limit);       
        }
        res.send(products);
    })

})


router.get('/:pid', (req,res)=>{
    const verProductId = productManager.getProductsById(req.params.pid);
    verProductId.then((product)=>{
        if(product.length) {
            res.send(product)
        } else{
            res.send({status:400, message:"Product not found"})
        }
       
    })
});


router.post('/', (req,res)=>{
    const product = req.body;
    
    const addproduct = productManager.addProduct(product);
    if(addproduct){
        res.send({status:200, message:`Product added: ${addproduct}`})
    } else {
        res.send({status:400, message:"Product not added"})
    }
    
    
});

router.put('/:pid', async (req,res)=>{
    const id = req.params.pid;
    const product = req.body;
    if(req.body.code){
        const code = await productManager.getCode(req.body.code);
        if(!code){
            const updateProduct = productManager.updateProduct(id, product);
            res.send({status:200, message:"Product updated"})
        } else {
            res.send({status:400, message:"Code repited, product code already exists"})
        }
    } else {
        const updateProduct = productManager.updateProduct(id, product);
        res.send({status:200, message:"Product updated"})
    }
});
return router;
}





export default productRoutes;
