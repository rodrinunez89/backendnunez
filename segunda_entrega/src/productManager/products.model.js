import mongoose from 'mongoose';

const collection = 'products';

const schema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    stock: Number,
    id: String,
   
});

const productModel = mongoose.model(collection, schema);

export default productModel;



