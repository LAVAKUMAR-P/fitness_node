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
    
        //get data from data base
        const check = await registerSchema.find({ userid: req.body.userid });
        console.log("---------------------------------------------------------------------");
        console.log(check[0].admin);
        console.log("---------------------------------------------------------------------");
        if(check[0].admin){
            next();
         await client.disconnect();
        console.log("connection disconnected");
        } else {
            console.log("pasword incorrect-------------------------------")
            res.status(403).json({
                message: "You are not allowed to see this data"
          })
        await client.disconnect();
        console.log("connection disconnected");
        }
      } catch (error) {
        console.log(error);
        console.log("mismatch------------------------");
        res.status(403).json({
          message: "You are not allowed to see this data"
      })
      }
}

export default  admincheck ; 
