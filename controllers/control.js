import registerSchema from "../models/RegisterSchema.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcryptjs from "bcrypt";
import creatwork from "../models/creatwork.js";
import UserbmI from "../models/Userbmi.js";
import WorkouT from "../models/Workout.js";
import sendEmail from "../utils/Email.js";
import TokenSchema from "../models/token.js";
import crypto from "crypto";
dotenv.config();

/*regiser user */
export const Register = async (req, res) => {
 
  try {
    // connect the database

    let client = await mongoose.connect(process.env.CONNECTION_URL);

    //Hash password
    let salt = bcryptjs.genSaltSync(10);
    let hash = bcryptjs.hashSync(req.body.password, salt);
    req.body.password = hash;

    //make user admin access false
    req.body.admin=false;
    const post = req.body;
    

    //check mail id is alred there or not
    const registerSchemas = await registerSchema.findOne({ email: req.body.email });
   
      if(!registerSchemas){
         //creating schma for data base
    const newPost = new registerSchema(post);

    //save data in database
    await newPost.save();

    // Close the Connection
    await mongoose.disconnect();
    console.log("connection closed");
     return res.status(201).json(newPost);
 }
 await mongoose.disconnect();
 console.log("connection closed");
  return res.status(409).json({
    message: "Emailid is alredy there"
}) 
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error });
  }
};


/*log in*/

export const Login = async (req, res) => {
 
  try {
    // connect the database

    let client = await mongoose.connect(process.env.CONNECTION_URL);

    //get data from data base
    const registerSchemas = await registerSchema.findOne({ email: req.body.email });
    const check = await registerSchema.find({ email: req.body.email });
   
    

    let user = registerSchemas;
 
    if (user) {
      // Hash the incoming password
      // Compare that password with user's password
  
      let matchPassword = bcryptjs.compareSync(
        req.body.password,
        user.password
      )
      if (matchPassword) {
        // Generate JWT token
        let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
     
        res.json({
          message: true,
          token,
          unconditional:check[0].admin,
        });
      }
      else {
      
        res.status(401).json({
          message: "Username/Password is incorrect"
      })
       }
    } 
    else {
  
      res.status(401).json({
        message: "Username/Password is incorrect"
    })
     }
    // Close the Connection
    await mongoose.disconnect();
  } catch (error) {
    console.log(error);
    // console.log("mismatch------------------------");
    res.status(401).json({
      message: "Username/Password is incorrect"
  })
  }
};

/*create workout*/
export const createworkout = async (req, res) => {
  req.body.userid = req.userid;
  // req.body.message.date=new Date().toLocaleDateString();
  const post = req.body;
 
  try {
    // connect the database
    let client = await mongoose.connect(process.env.CONNECTION_URL);

    //save data in data base
    const newPost = new creatwork(post);

    await newPost.save();

    // Close the Connection
    await mongoose.disconnect();

    res.status(201).json(newPost);
  } catch (error) {
    console.log(error + "create work");
    res.status(209).json({ message: error });
  }
};

/*create BMI*/
export const createBmi = async (req, res) => {

  req.body.userid = req.userid;
  const post = req.body;

  try {
    // connect the database
    let client = await mongoose.connect(process.env.CONNECTION_URL);

    //save data in data base
    const bmi = await UserbmI.findOne({userid: req.userid });
    if(!bmi){
    const newPost = new UserbmI(post);
  
    await newPost.save();
    await res.status(201).json({message:"Bmi registered sucessfully"});
    }else{
      await res.status(409).json({
        message: "Bmi registered already registerd"
    }) 
    }
    
    // Close the Connection
    await mongoose.disconnect();
  
  } catch (error) {
    // console.log("---------------------------------------------------------------------------------");
    // console.log(error + "create work");
    res.json({ message: "something went wrong" });
  }
};

/*get workoutdone*/
export const getworkout = async (req, res) => {
  req.body.userid = req.userid;
 
  try {
    // connect the database
    let client = await mongoose.connect(process.env.CONNECTION_URL);
   
    //Get data in data base
    const registerSchemas = await creatwork.find({ userid: req.body.userid });
    const BMIMessages = await  UserbmI.find({ userid: req.body.userid });
    
    // Close the Connection
    await mongoose.disconnect();

    res.status(201).json({registerSchemas,BMIMessages});
  } catch (error) {
    // console.log(error + "create work");
    res.status(209).json({ message: "something went wrong" });
  }
};


/*get workout and types*/
export const workout_type = async (req, res) => {
  req.body.userid = req.userid;

  try {
    // connect the database
    let client = await mongoose.connect(process.env.CONNECTION_URL);
   
    //Get data in data base
    const Workouts = await WorkouT.find();
    
    
    // Close the Connection
    await mongoose.disconnect();

    console.log(Workouts);
    res.status(201).json(Workouts);
  } catch (error) {
    console.log(error + "create work");
    res.status(209).json({ message: "something went wrong" });
  }
};

/*get workout based on object id*/
export const getworkout_edit = async (req, res) => {
  try {
    // connect the database
    let client = await mongoose.connect(process.env.CONNECTION_URL);
    const id = req.params.id;

    //query
    creatwork.findById(id, async (error, resulte) => {
      if (error) {
    
        res.status(209).json({ message: "invaild data" });
        await mongoose.disconnect();
 
      } else {
      
        if (resulte === null) {
          res.status(209).json({ message: "invaild data" });
          await mongoose.disconnect();
     
        } else {
          res.status(201).json(resulte);
          await mongoose.disconnect();
          console.log("connection closed from else");
        }
      }
    });

  } catch (error) {
    console.log(error + "error from find id catch");
    res.status(209).json({ message: "invaild data" });
  }
};

/*get BMI based on object id*/
export const getbmiedit = async (req, res) => {
  try {
    // connect the database
    let client = await mongoose.connect(process.env.CONNECTION_URL);
    const id = req.params.id;

    //query
    UserbmI.findById(id, async (error, resulte) => {
      if (error) {
  
        res.status(209).json({ message: "invaild data" });
        await mongoose.disconnect();
  
      } else {
     
        if (resulte === null) {
          res.status(209).json({ message: "invaild data" });
          await mongoose.disconnect();
          console.log("connection closed from else");
        } else {
          res.status(201).json(resulte);
          await mongoose.disconnect();
          console.log("connection closed from else");
        }
      }
    });

  } catch (error) {
    console.log(error + "error from find id catch");
    res.status(209).json({ message: "invaild data" });
  }
};

/*Edit BMI*/
export const editbmi = async (req, res) => {
  try {
    // connect the database
    let client = await mongoose.connect(process.env.CONNECTION_URL);

    //update data in data base
    const { id: _id } = req.params;
    const post = req.body;
    console.log(post);
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send("Data with this id not avalilable");
    }
    const editPost = await UserbmI.findByIdAndUpdate(_id, post, {
      new: true,
    });
 
    // Close the Connection
    await mongoose.disconnect();
    console.log("connection closed");
    res.status(201).json({ message: "Data updated" });
  } catch (error) {
    // console.log(error +" "+"$edit post catch-----------------------------");
    res.status(209).json({ message: "something went wrong" });
  }
};


/*Edit workout*/
export const editworkout = async (req, res) => {
  try {
    // connect the database
    let client = await mongoose.connect(process.env.CONNECTION_URL);

    //update data in data base
    const { id: _id } = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send("Data with this id not avalilable");
    }else{
      // console.log("Data availabale----------------------------------------------------------------");
    }
    const editPost = await creatwork.findByIdAndUpdate(_id, post, {
      new: true,
    });
   
    // Close the Connection
    await mongoose.disconnect();
    console.log("connection closed");
    res.status(201).json({ message: "Data updated" });
  } catch (error) {
    console.log(error +" "+"$edit post catch-----------------------------");
    res.status(209).json({ message: "something went wrong" });
  }
};

/*Delete workout*/
export const deletePost = async (req,res) =>{

  try {
// connect the database
    let client = await mongoose.connect(process.env.CONNECTION_URL);


  const {id: _id} = req.params;
  // console.log(id+" "+"to delete id");
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Data with this id not avalilable");
  }else{
    console.log("Data availabale----------------------------------------------------------------");
  }
 

   creatwork.findByIdAndRemove(_id,async(error,Deleteddata)=>{
            if(error){
              console.log(error +"error from findidand remove----------------------------");
            }
            else{
              console.log(Deleteddata);
              await res.status(201).send("Data with this id deleted");
              await mongoose.disconnect();
              console.log("database disconected")
            }
   })
 
  } catch (error) {
    console.log(error +" "+"catch--------------------------------------------------")
    return res.status(404).send('Data with this id not avalilable');
  }
  
}




/*forget password */

export const forgotPassword = async (req, res) => {
 
  try {
    let client = await mongoose.connect(process.env.CONNECTION_URL);
      /*check user is available */
      
      const user = await registerSchema.findOne({ email: req.body.email });
      if (!user)
          return res.status(400).send("user with given email doesn't exist");

      let token = await TokenSchema.findOne({ userId: user._id });

      if (!token) {
          token = await new TokenSchema({
              userId: user._id,
              token: crypto.randomBytes(32).toString("hex"),
          }).save();
      }

      const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`;
      await sendEmail(user.email, "Password reset",`your rest password link : ${link}` );

      await mongoose.disconnect();
      res.status(200).send("password reset link sent to your email account");
     
      // console.log("connection closed");
  } catch (error) {
      res.status(406).send("An error occured"+error);
      console.log(error);
      await mongoose.disconnect();
      console.log("connection closed****");
  }
};

/*Reset password */

export const resetpassword = async (req, res) => {
  try {
      /*cinect with DB */
      let client = await mongoose.connect(process.env.CONNECTION_URL);

      const user = await registerSchema.findById(req.params.userId);
      if (!user) return res.status(400).send("invalid link or expired");

      const token = await TokenSchema.findOne({
          userId: user._id,
          token: req.params.token,
      });
      if (!token) return res.status(406).send("Invalid link or expired");
          //Hash password
        let salt = bcryptjs.genSaltSync(10);
       let hash = bcryptjs.hashSync(req.body.password, salt);
       req.body.password = hash;

      user.password = req.body.password;
      await user.save();
      await token.delete();

     
      res.status(200).send("password reset sucessfully.");
      await mongoose.disconnect();
     
      console.log("connection closed");
      
  } catch (error) {
    console.log(error+"    "+"reset password");
      res.status(406).send("An error occured");
      // console.log(error);
  }
}