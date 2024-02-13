const express=require('express');
require('./config');
const product=require('./product');

const app=express();
app.use(express.json()); //iss ko use krty hain data ko json format m convert krny k liye
app.post('/create', async(req,resp)=>{
    const data= new product(req.body);
    let result= await data.save();
    console.log(req.body);//data ko body sy ly k ata hai
    resp.send(result);
    
});
app.get('/list',async(req,resp)=>{
    let data=await product.find();
    resp.send(data)
    console.log(data);
})
app.put('/update',async(req,resp)=>{
    let data=await product.updateOne({'name':'Iphone 14'},{$set:{'name':'Samsung'}});
    resp.send(data)
    console.log(data);
})
app.delete('/delete',async(req,resp)=>{
    let data=await product.deleteOne({'price':100});
    resp.send(data);
    console.log(data);
})
//Search api with single fields and multiple fields
app.get('/search/:key',async(req,resp)=>{
    console.log(req.params.key);
    let data= await product.find({
        $or:[
            {'name':{$regex:req.params.key}},
            {'brand':{$regex:req.params.key}},
            {'category':{$regex:req.params.key}},
            
           
        ]
    });
    resp.send(data);
})
app.listen(4500);
