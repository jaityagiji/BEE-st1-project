const express = require('express');
const Router = express.Router();
const productController = require("../controller/productController");

Router.get('/', (req,res) => {
    res.send("Api is working fine");
})
Router.post('/product/create', productController.productCreate);
Router.get('/product/:id', productController.productGet);
Router.patch('/product/:id', productController.productUpdation);
Router.delete('/product/delete/:id', productController.productDeletion);


module.exports = Router;