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




const updateSellerLotteries = async (req, res) => {
  try {
    const { sellerId } = req.params;

    // Predefined lotteries (this will be the same every time)
    const predefinedLotteries = [
      {
        id: "WIN-WIN",
        image: "https://glitch-aswin.github.io/nft-pics/images/kadhakali10326.png",
        value: 100,
      },
      {
        id: "KARUNYA",
        image: "https://glitch-aswin.github.io/nft-pics/images/palakkad1006.png",
        value: 200,
      },
      {
        id: "FIFTY-FIFTY",
        image: "https://glitch-aswin.github.io/nft-pics/images/illam10501.png",
        value: 150,
      },
      {
        id: "STHREESHAKTHI",
        image: "https://glitch-aswin.github.io/nft-pics/images/vembanad10002.png",
        value: 250,
      },
      {
        id: "AKSHAYA",
        image: "https://glitch-aswin.github.io/nft-pics/images/vembanad1004.png",
        value: 300,
      },{
        id: "PLUS-KARUNYA",
        image: "https://glitch-aswin.github.io/nft-pics/images/vembanad1054.png",
        value: 300,
      },
    ];

    // Find the seller by sellerId
    const seller = await Seller.findOne({ sellerId });
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    // Update the seller's lotteries with the predefined data
    seller.lotteries = predefinedLotteries;

    // Save the updated seller document
    await seller.save();

    // Respond with success message
    res.status(200).json({ message: seller.lotteries });
  } catch (error) {
    console.error("Error updating lotteries:", error);
    res.status(500).json({ message: "Error updating lotteries" });
  }
};



// Helper function to generate a random lottery ID with a fixed prefix
const generateLotteryId = (prefix) => {
  const randomPart = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit random number
  return `${prefix}${randomPart}`;
};

const updateSellerLottery = async (req, res) => {
  try {
    const { sellerId, lotteryId } = req.params;  // Get sellerId and lotteryId from URL parameters

    // Find the seller by sellerId
    const seller = await Seller.findOne({ sellerId });
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    // Define the fixed part of the lottery ID (first four characters)
    const fixedPrefix = lotteryId.substring(0, 4); // The first 4 characters of the provided lotteryId

    // Generate the new lottery ID by appending a random 4-digit number to the fixed prefix
    const newLotteryId = generateLotteryId(fixedPrefix);

    // Create a new lottery object with the generated ID
    const newLotteries = [];
    for (let i = 0; i < 5; i++) {
      const newLotteryId = generateLotteryId(fixedPrefix);  // Generate a unique lottery ID
      newLotteries.push({
        id: newLotteryId,
      });
    }

 

    // Save the updated seller document
    await seller.save();
    

    // Respond with success message and the newly added lottery
    res.status(200).json({
      message: newLotteries,
    });
  } catch (error) {
    console.error("Error adding lottery:", error);
    res.status(500).json({ message: "Error adding lottery" });
  }
};



module.exports = {
  updateSellerLotteries,
  generateSellerId,updateSellerLottery
};
