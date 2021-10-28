import registerSchema from "../models/RegisterSchema.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();



 const admincheck = async (req,res,next)=>{
    console.log("checking"+"=>=>=>=>=>=>=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    req.body.userid = req.userid;
    try {
        // connect the database
    
        let client = await mongoose.connect(process.env.CONNECTION_URL);
        console.log("admin mogo connected");
    
        //get data from data base
        const check = await registerSchema.find({ _id: req.body.userid });
        console.log("---------------------------------------------------------------------");
        // console.log(check[0].admin);
        console.log("hay working---------------------------------------------------------------------");
        console.log(check);
        let value=check[0].admin
        if(value){
            
         await client.disconnect();
        console.log("connection disconnected");
            next();
        } else {
        console.log("pasword incorrect-------------------------------")
        await client.disconnect();
        console.log("connection disconnected");
        res.status(401).json({ message: "You are not allowed to see this data"})
        }
      } catch (error) {
        console.log(error);
        console.log("mismatch------------------------");
        res.status(401).json({
          message: "You are not allowed to see this data"
      })
      }
}

export default  admincheck ; 
