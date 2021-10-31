import registerSchema from "../models/RegisterSchema.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();



 const admincheck = async (req,res,next)=>{
   
    req.body.userid = req.userid;
    try {
        // connect the database
    
        let client = await mongoose.connect(process.env.CONNECTION_URL);
        
    
        //get data from data base
        const check = await registerSchema.find({ _id: req.body.userid });
        
        // console.log(check[0].admin);
    
        let value=check[0].admin
        if(value){
            
         await client.disconnect();
            next();
        } else {
        await client.disconnect();
     
        res.status(401).json({ message: "You are not allowed to see this data"})
        }
      } catch (error) {
        console.log(error);
        res.status(401).json({
          message: "You are not allowed to see this data"
      })
      }
}

export default  admincheck ; 
