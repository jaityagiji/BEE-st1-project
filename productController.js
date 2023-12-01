const Product = require("../model/product");
const fs = require("fs");
const Index = fs.readFileSync("index.html", "utf-8");

const productCreate = async (req,res) => {
    const reqBody = req.body;
    if(!reqBody){
        return res.status(400).json({message: "Request body cannot be empty"});
    }
    console.log(reqBody);
    const newProduct = new Product(reqBody);
    try{
        await newProduct.save();
    }
    catch(err){
        console.log(err);
        return res.status(401).json("Internal Server Error");
    }
    res.status(201).json({
        message: 'Created',
        product: newProduct
    }); 
}

const productGet = async (req,res) => {
    try {
        const index = Number(req.params.id);

        if(isNaN(index) || index < 1){
            return res.status(400).json({error : "InValid ID"});
        }

        const product = await Product.findOne().skip(index-1).limit(1);

        if(!product) {
            return res.status(404).json({ error: "No such product found!" })
        }

        console.log(product);
        let modifiedIndex = Index
        .replace("*title",product.title)
        .replace("*url*", product.thumbnail)
        .replace("*price*", product.price)
        .replace("*rating*", product.rating);
        res.send(modifiedIndex);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
}

const productUpdation = async (req,res) =>{
    try {
        const index = req.params.id;

        if(isNaN(index) || index < 1){
            return res.status(400).json({error: "Invalid ID"});
        }
        const product = await Product.findOne().skip(index-1).limit(1);

        if(req.body.title) {
            product.title = req.body.title;
        }

        if(req.body.description){
            product.description = req.body.description;
        }

        if(req.body.price){
            product.price = req.body.price;
        }

        if(req.body.brand){
            product.brand = req.body.brand;
        }

        if(req.body.category){
            product.category = req.body.category;
        }

        if(req.body.thumbnail){
            product.thumbnail = req.body.thumbnail;
        }

        const updateProduct = await product.save();

        res.json(updateProduct);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
}

const productDeletion = async (req,res) => {
    try {
        const index = req.params.id;

        if(isNaN(index) || index < 1){
            return res.status(400).json({error: "InValid ID"});
        }
        const product = await Product.findOne().skip(index - 1).limit(1);

        if(!product){
            return res.status(404).json({error: 'No such product'});
        }
        const deleteProduct = await product.remove();
        res.json(deleteProduct);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
}

module.exports = {productCreate, productGet , productUpdation , productDeletion};