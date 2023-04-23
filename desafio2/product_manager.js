const fs = require ('fs');

const puerto = 8080;

const archivo = './package.json';

class Product{
    constructor(product){
        this.title = product.title;
        this.description = product.description;
        this.price = product.price;
        this.thumbnail = product.thumbnail;
        this.code = product.code;
        this.stock = product.stock;
        this.id = product.id;
    }
}
class ProductManager {
    constructor(){
       this.products = [];
    }
    
    async addProduct(product) {
        if(this.checkProduct(product)){
            this.products.push(new Product({
                title: product.title,
                description: product.description,
                price: product.price,
                thumbnail: product.thumbnail,
                code: product.code,
                stock: product.stock,
                id: this.generateId()
            }));
            console.log('Product added:',product);
            await fs.promises.writeFile(archivo, JSON.stringify(product, 'utf-8'));
            
        } else {
            console.error('Error on add product', product);
        }
    }

    consultarusuario = async ()=>{
        const leerproduct = await fs.promises.readFile(archivo ,'utf-8')
        const leerproductJSON = JSON.parse(leerproduct);
        console.log(leerproductJSON);
        consultarusuario ();
    }

    async deleteItemById(productId){
        this.products.forEach((product, index)=>{
            if (product.id === productId) {
                this.products.splice(index, 1)
                
        }})
    await fs.promises.writeFile(archivo, JSON.stringify(product, 'utf-8'));
    }

    checkProduct(product){
        return !this.getCode(product.code) && product.title && product.description && product.price && product.thumbnail && product.stock
    }

    getCode(code){
        return this.products.find(product => product.code == code)
    }

    getProducts(){
        return this.products;
    }

    getProductsById(id){
        return this.products.find((product) => {
                if(product.id === id){
                    return product
                } else {
                    console.error('not found id:', id);
                }
        })
    }
    

     updateProduct = async (id, campo, nuevoValor) => {
        const indice = this.products.findIndex(obj => obj.id === id);
    
        if (indice !== -1) { // si devuelve -1 significa que no encontró coincidencia en el id
            productos[indice][campo] = nuevoValor;
            await fs.promises.writeFile(archivo, JSON.stringify(product, 'utf-8'));
        }
        else {
            console.error('not found id:', id);
        }
    }


    generateId(){
        return this.products.length + 1;
    }


}


const productNuevo = new ProductManager();


//productNuevo.addProduct({title: 'remera', description: 'blanca lisa' , price: '85', thumbnail: 'sin imagen', stock: 25})
productNuevo.addProduct({title: 'jeans', description: 'blanca lisa' , price: '85', thumbnail: 'sin imagen', stock: 20})
// const productManager = new ProductManager();
// console.log(productManager.getProducts());
// productManager.addProduct({
//     title: 'producto prueba',
//     description:'Este es un producto prueba',
//     price:'200',
//     thumbnail:'Sin imagen',
//     code:'abc123',
//     stock:25
// })
// console.log(productManager.getProducts());

// productManager.addProduct({
//     title: 'producto prueba',
//     description:'Este es un producto prueba',
//     price:'200',
//     thumbnail:'Sin imagen',
//     code:'abc123',
//     stock:25
// })

// console.log(productManager.getProductsById(1))
// productManager.getProductsById(4)