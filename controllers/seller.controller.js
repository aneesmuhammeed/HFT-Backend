const { Seller } = require("../models/product.model");  // Import the Seller model

// Helper function to generate a unique 8-digit seller ID
const generateUniqueSellerId = async () => {
  let sellerId;
  let unique = false;

  // Loop to ensure the generated ID is unique
  while (!unique) {
    // Generate a random 8-digit ID
    sellerId = Math.floor(10000000 + Math.random() * 90000000).toString();

    // Check if the ID already exists in the database
    const existingSeller = await Seller.findOne({ sellerId: sellerId });
    if (!existingSeller) {
      unique = true;  // ID is unique, break the loop
    }
  }

  return sellerId;
};

// Controller to handle the GET request, generate ID, save it and return the ID
const generateSellerId = async (req, res) => {
  try {
    // Step 1: Generate a unique 8-digit seller ID
    const sellerId = await generateUniqueSellerId();

    // Step 2: Create a new seller document with the generated sellerId
    const newSeller = new Seller({
      sellerId: sellerId,  // Generated unique seller ID
      name: "Unknown",      // Default values for name, age, and details
      age: 0,               // Default age
      details: "Generated automatically", // Default details
      lotteries: []         // Default empty lotteries array
    });

    // Step 3: Save the new seller document to the database
    await newSeller.save();

    // Step 4: Return the generated sellerId in the response
    res.status(200).json({ sellerId });  // Send back the generated ID
  } catch (error) {
    console.error("Error generating seller ID:", error);
    res.status(500).json({ message: "Error generating seller ID" });
  }
};

module.exports = {
  generateSellerId
};
