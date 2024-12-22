const express = require('express');
const mongoose = require('mongoose');
const Product = require("./models/product.model.js");
const productRoute = require("./routes/product.route.js");
const app = express();

// Import environment variables
require('dotenv').config();

// Routes
const sellerRoute = require('./routes/seller.route.js');
const buyerRoute = require("./routes/buyer.route.js");

// Use JSON and URL encoding middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Define routes
app.use("/buyer", buyerRoute);
app.use("/seller", sellerRoute);




//new shitttsss
app.get('/seller/payment/failure', (req, res) => {
  const failureReason = true;

  if (failureReason) {
      // If failure reason is provided, send a failure response
      res.status(400).json({
          status: 'failure',
          reason: "payment failed"
      });
  } else {
      // If no failure reason is provided, return a default message
      res.status(400).json({
          status: 'failure',
          reason: 'Unknown error'
      });
  }
});

// Route to handle successful payment and mint NFT
app.post('/seller/payment/success/nft-mint', (req, res) => {
    // Extract buyerId, sellerId, and public addresses from the request body
    const { buyerId, sellerId, buyerPublicAddress } = req.body;

    // Check if all necessary fields are provided
    if (buyerId && sellerId && buyerPublicAddress ) {
        // Simulate creating an NFT tokenURI (this could be dynamic in real applications)
        const tokenuri = `https://example.com/nft/${buyerId}-${sellerId}`;

        // Respond with the tokenURI, buyerId, sellerId, and public addresses
        res.status(200).json({
            status: 'success',
            tokenuri: tokenuri,
            buyerId: buyerId,
            sellerId: sellerId,
            buyerPublicAddress: buyerPublicAddress
        });
    } else {
        // If any of the required fields are missing, return an error
        res.status(400).json({
            status: 'failure',
            message: 'BuyerId, SellerId and  BuyerPublicAddress are required'
        });
    }
});





// Connect to MongoDB using environment variables
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected!');
    // Render will automatically assign the PORT environment variable
    const port = process.env.PORT || 3000;  // Default to 3000 if PORT is not set (for local development)
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log('Not Connected!', err);
  });
