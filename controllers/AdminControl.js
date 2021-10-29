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
      let messages=await registerSchema.find();
      res.status(201).json(messages);
      console.log(messages);
      // Close the Connection
      await mongoose.disconnect();

    } 
     catch (error) {
      console.log(error);
      console.log("mismatch------------------------");
      res.status(401).json({
        message: "somethig went wrong"
    })
    }
  };


 /*make as admin */ 
export const makeadmin = async (req, res) => {
    console.log("----------------------------------------------------------------------------------------");
    console.log("makeadmin process start"+"=>=>=>=>=>=>=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    console.log(req.body.email);
    console.log("----------------------------------------------------------------------------------------");
    try {
      // connect the database
      let client = await mongoose.connect(process.env.CONNECTION_URL);
  
      //update data in data base
      const check = await registerSchema.find({email: req.body.email});
      check[0].admin=true;
      const post = check[0];
      let _id=check[0]._id
      const editPost = await registerSchema.findByIdAndUpdate( _id, post, {
        new: true,
      });
      console.log("edited ---------------------------------------");
      // Close the Connection
      await client.disconnect();
      console.log("connection closed");
      res.status(201).json({ message: "Data updated" });
    } catch (error) {
      console.log(error +" "+"$edit post catch-----------------------------");
      res.status(209).json({ message: "something went wrong" });
    }
  };

/*Remove admin */ 
export const removeadmin = async (req, res) => {
  try {
    // connect the database
    let client = await mongoose.connect(process.env.CONNECTION_URL);

    //update data in data base
    const check = await registerSchema.find({email: req.body.email});
    check[0].admin=false;
    const post = check[0];
    let _id=check[0]._id
    const editPost = await registerSchema.findByIdAndUpdate( _id, post, {
      new: true,
    });
    // Close the Connection
    await client.disconnect();
    console.log("connection closed");
    res.status(201).json({ message: "Data updated" });
  } catch (error) {
    console.log(error +" "+"$edit post catch-----------------------------");
    res.status(209).json({ message: "something went wrong" });
  }
};