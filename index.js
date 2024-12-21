const express = require('express')
const mongoose = require('mongoose');
const Product = require("./models/product.model.js");
const productRoute = require("./routes/product.route.js");
const app = express()

const sellerRoute = require('./routes/seller.route.js'); 
const buyerRoute = require("./routes/buyer.route"); 

//using json
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//roues
app.use("/buyer", buyerRoute);
app.use("/seller", sellerRoute);



mongoose.connect('mongodb+srv://akmalser7:podapatty@cluster0.r9rum.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('Connected!');
    app.listen(3000, () => {
      console.log("server is running on port 3000");
    });
  })
  .catch(() => {
    console.log('Not Connected!');
  })


