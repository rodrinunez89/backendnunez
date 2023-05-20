import fs from 'fs/promises';
import path from 'path';
import productModel from './products.model.js';

class ProductManager {
    constructor(path){
       this.products = []
       this.path = path;
    }
    
    async addProduct(product) {
        const products = await this.getProducts();
        const checkProducts = await this.checkProduct(product);
        if(checkProducts){
            products.push(
                {
                    title: product.title,
                    description: product.description,
                    price: product.price,
                    status:product.status || true,
                    thumbnail: product.thumbnail,
                    code: product.code,
                    stock: product.stock,
                    id: await this.generateId()
                }
            );
            
            console.log('Product added:',product);
            console.log(products);
            await fs.writeFile(this.path, JSON.stringify(products, 'utf-8', 4));
            return true
        } else {
            console.error('Error on add product', product);
            return false
        }
    }

    

    async deleteItemById(productId){
        this.products.forEach((product, index)=>{
            if (product.id === productId) {
                this.products.splice(index, 1)
                
        }})
    await fs.writeFile(this.path, JSON.stringify(product, 'utf-8'));
    }

    async checkProduct(product){
        const code = await this.getCode(product.code);
        return !code && product.title && product.description && product.price && product.stock
    }

    async getCode(code){
        const products = await this.getProducts();
        const productFind = products.filter((product) => product.code == code);
        console.log(productFind);
        if(productFind.length) {
            return true;
        } else {
            return false;
        }
    }

    async getProducts(){
        //const products = await fs.readFile(this.path ,'utf-8');
        const products = await productModel.find();
        const productsJson = JSON.parse(products);
        return productsJson;
    }

    async getProductsById(id){
        const products = await this.getProducts();
        const product = products.filter(product => product.id === parseInt(id));
        return product;
    }
    

    async updateProduct(id, params){
        let products = await this.getProducts();
        products = products.map((product) => {
            if(product.id === parseInt(id)){
                return {...product, ...params};
            } else {
                return product;
            }
        })
        await fs.writeFile(this.path, JSON.stringify(products, 'utf-8', 4));
    }


    async generateId(){
        const products = await this.getProducts();
        return products.length + 1;
    }


}


export default ProductManager;

