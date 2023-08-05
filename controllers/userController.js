const User = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const config=require("../config/config");
const jwt=require("jsonwebtoken");
const fs = require('fs');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with your API credentials
cloudinary.config({
  cloud_name: "dyukjqemj",
  api_key: "975334944781146",
  api_secret: "USmTRR4C6ly_RDh-82Y8rhMIMzc",
});

const uploadImageToCloudinary = async (imageFile) => {
  try {
    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(imageFile, {
 // Optional: You can specify a folder to organize your images
      use_filename: true, // Keep the original filename
    });

    // Cloudinary response will contain the image URL and other information
    return result.url;
  } 
  catch (error) {
    throw new Error('Image upload failed');
  }
};



const updateUserInfo = async (req, res) => {
  try {
    const phone = req.body.phone;
    const name = req.body.name;
    const image = req.body.image;

    // Find the user based on the provided phone number
    const user = await User.findOne({ phone: phone });

    console.log(phone);
    if (!user) {
      return res.status(400).send({ success: false, msg: "User not found" });
    }
    let imageUrl = null;
    if (image) {
      imageUrl = await uploadImageToCloudinary(image.path);
    }

    // Update the user's name and image
    user.name = name || user.name; // If name is provided, update it; otherwise, keep the existing name
    user.image = imageUrl || user.image;; // If image is provided, update it; otherwise, keep the existing image

    // Save the updated user
    const updatedUser = await user.save();

    // Prepare the response
    const userResult = {
      _id: updatedUser._id,
      name: updatedUser.name,
      phone: updatedUser.phone,
      image: updatedUser.image,
      type: updatedUser.type,
    };

    const response = {
      success: true,
      msg: "User information updated successfully",
      data: userResult,
    };

    res.status(200).send(response);
  } 
  catch (error) {
    res.status(400).send(error.message);
  }
};
const user_login = async (req, res) => {
  try {
    const phone = req.body.phone;
    const userData = await User.findOne({ phone: phone });

    if (userData) {
      // User exists, send user details
      const userResult = {
        _id: userData._id,
        name: userData.name,
        phone: userData.phone,
        image: userData.image,
        type: userData.type,
      };

      const response = {
        success: true,
        msg: "UserDetail",
        data: userResult,
      };
      res.status(200).send(response);
    } else {
      // User does not exist, signup the user
      const newUser = new User({
        phone: phone,
        // Add any other required fields for signup
      });

      const savedUser = await newUser.save();
      const userResult = {
        _id: savedUser._id,
        name: savedUser.name,
        phone: savedUser.phone,
        image: savedUser.image,
        type: savedUser.type,
      };

      const response = {
        success: true,
        msg: "User created successfully",
        data: userResult,
      };
      res.status(200).send(response);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
module.exports = {
  user_login,
  updateUserInfo,
  uploadImageToCloudinary
};
