import fs from 'fs/promises';
import path from 'path';

class CartManager {
    constructor(){
        this.path = path.resolve(`cart.json`);
    }

    

    async addCart(products) {
        const carts = await this.getCarts();
        if(Array.isArray(products)){
            carts.push({
                "id": await this.generateId(),
                "products": products
            })
            await fs.writeFile(this.path, JSON.stringify(carts, 'utf-8', 4));
            return true
        } else {
            return false
        }
    }
    
    async addProductToCart(id, productID, quantity) {
        const cart = await this.getCartsById(id);
        const carts = await this.getCarts();
        const cartIndex = carts.findIndex((_cart) => _cart.id === id);
        if(cart){
            const productIndex = cart.products.findIndex((product) => product.product === productID)
            if(productIndex !== -1){
               cart.products[productIndex] = {
                   ...cart.products[productIndex],
                   "quantity": cart.products[productIndex].quantity + quantity,
               }
            } else {
               cart.products.push({
                   "product": productID,
                   "quantity": quantity
               })
            }
            carts[cartIndex] = cart;
            await fs.writeFile(this.path, JSON.stringify(carts, 'utf-8', 4));
            return cart
        } else {
            return false;
        }
    }

    async getCarts(){
        const carts = await fs.readFile(this.path ,'utf-8');
        return JSON.parse(carts) || [];
    }

    async getCartsById(id){
        let carts = await fs.readFile(this.path ,'utf-8');
        carts = JSON.parse(carts);
        const cart = carts.find((cart) => cart.id === id);
        if(cart){
            return cart
        } else {
            return false
        }
    }


    async generateId(){
        const carts = await this.getCarts();
        return carts.length + 1;
    }


}


export default CartManager;

