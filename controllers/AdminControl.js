import registerSchema from "../models/RegisterSchema.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import express  from "express";
import WorkouT from "../models/Workout.js";
dotenv.config();




/*to see all user details */
export const Alluser = async (req, res) => {

    try {
      // connect the database
  
      let client = await mongoose.connect(process.env.CONNECTION_URL);
       
      //get data from data base
      let messages=await registerSchema.find();
      res.status(201).json(messages);
      
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
     
      // Close the Connection
      await mongoose.disconnect();
    
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
    await mongoose.disconnect();
  
    res.status(201).json({ message: "Data updated" });
  } catch (error) {
    console.log(error +" "+"$edit post catch-----------------------------");
    res.status(209).json({ message: "something went wrong" });
  }
};

/*create workout for users*/
export const workout = async (req, res) => {
  req.body.userid = req.userid;
  // req.body.message.date=new Date().toLocaleDateString();
  const post = req.body;
 
  try {
    // connect the database
    let client = await mongoose.connect(process.env.CONNECTION_URL);

    //save data in data base
    const newPost = new WorkouT(post);

    await newPost.save();

    // Close the Connection
    await mongoose.disconnect();
 
    res.status(201).json(newPost);
  } catch (error) {
    console.log(error + "create work");
    res.status(209).json({ message: error });
  }
};

/*data get by Id from workout*/
export const workout_id = async (req, res) => {
  try {
    // connect the database
    let client = await mongoose.connect(process.env.CONNECTION_URL);
    const id = req.params.id;

    //query
    WorkouT.findById(id, async (error, resulte) => {
      if (error) {
        console.log(error + "error from find id");
        res.status(209).json({ message: "invaild data" });
        await mongoose.disconnect();
    
      } else {
   
        if (resulte === null) {
          res.status(209).json({ message: "invaild data" });
          await mongoose.disconnect();
          // console.log("connection closed from else");
        } else {
          res.status(201).json(resulte);
          await mongoose.disconnect();
          // console.log("connection closed from else");
        }
      }
    });

  } catch (error) {
    console.log(error + "error from find id catch");
    res.status(209).json({ message: "invaild data" });
  }
};

/*Edit workout data*/
export const Workout_edit = async (req, res) => {
  try {
    // connect the database
    let client = await mongoose.connect(process.env.CONNECTION_URL);

    //update data in data base
    const { id: _id } = req.params;
    const post = req.body;
   
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send("Data with this id not avalilable");
    }else{
      console.log("Data availabale----------------------------------------------------------------");
    }
    const editPost = await WorkouT.findByIdAndUpdate(_id, post, {
      new: true,
    });
    // console.log("edited ---------------------------------------");
    // Close the Connection
    await mongoose.disconnect();
  
    res.status(201).json({ message: "Data updated" });
  } catch (error) {
    console.log(error +" "+"$edit post catch-----------------------------");
    res.status(209).json({ message: "something went wrong" });
  }
};

/*Delete workout by Admin*/
export const delete_workout = async (req,res) =>{

  try {
// connect the database
    let client = await mongoose.connect(process.env.CONNECTION_URL);


  const {id: _id} = req.params;
  // console.log(id+" "+"to delete id");
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Data with this id not avalilable");
  }else{
    // console.log("Data availabale----------------------------------------------------------------");
  }
 

  WorkouT.findByIdAndRemove(_id,async(error,Deleteddata)=>{
            if(error){
              console.log(error +"error from findidand remove----------------------------");
            }
            else{
           
              res.status(201).json("Deleted");
              await mongoose.disconnect();
             
            }
   })
 
  } catch (error) {
    console.log(error +" "+"catch--------------------------------------------------")
    return res.status(404).send('Data with this id not avalilable');
  }
  
}