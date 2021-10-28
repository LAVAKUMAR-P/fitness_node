import registerSchema from "../models/RegisterSchema.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import express  from "express";
dotenv.config();




/*to see all user details */
export const Alluser = async (req, res) => {
    console.log(req.body);
    try {
      // connect the database
  
      let client = await mongoose.connect(process.env.CONNECTION_URL);
  
      //get data from data base
      let Data=await registerSchema.find();
      console.log(Data);
      
     
      // Close the Connection
      await mongoose.disconnect();

    } 
     catch (error) {
      console.log(error);
      console.log("mismatch------------------------");
      res.status(401).json({
        message: "Username/Password is incorrect"
    })
    }
  };