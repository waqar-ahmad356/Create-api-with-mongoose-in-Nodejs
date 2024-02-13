const mongoose=require('mongoose');
const ProductSche= new mongoose.Schema({
    name:String,
    price:Number,
    brand:String,
    category:String
});


module.exports=mongoose.model('products',ProductSche);