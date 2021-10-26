import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcryptjs from "bcrypt";
import creatwork from "../models/creatwork.js";
var ObjectId = mongoose.Types.ObjectId;
dotenv.config();

/*regiser user */
export const Register = async (req, res) => {
  console.log(req.body);
  try {
    // connect the database

    let client = await mongoose.connect(process.env.CONNECTION_URL);

    //Hash password
    let salt = bcryptjs.genSaltSync(10);
    let hash = bcryptjs.hashSync(req.body.password, salt);
    req.body.password = hash;
    const post = req.body;
    console.log(post);

    //creating schma for data base
    const newPost = new PostMessage(post);

    //save data in database
    await newPost.save();

    // Close the Connection
    await client.disconnect();
    console.log("connection closed");
    res.status(201).json(newPost);
  } catch (error) {
    res.status(209).json({ message: error });
  }
};

/*log in*/

export const Login = async (req, res) => {
  console.log(req.body);
  try {
    // connect the database

    let client = await mongoose.connect(process.env.CONNECTION_URL);

    //get data from data base
    const postMessages = await PostMessage.findOne({ email: req.body.email });

    let user = postMessages;

    if (user) {
      // Hash the incoming password
      // Compare that password with user's password
      console.log(req.body);
      console.log(user.password);
      let matchPassword = bcryptjs.compareSync(
        req.body.password,
        user.password
      );
      if (matchPassword) {
        // Generate JWT token
        let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        console.log(token + "token-----------------------------------------");
        res.json({
          message: true,
          token,
        });
      }
      else {
        console.log("pasword incorrect-------------------------------")
        res.status(401).json({
          message: "Username/Password is incorrect"
      })
       }
    } 
    // Close the Connection
    await client.disconnect();
  } catch (error) {
    console.log("mismatch------------------------");
    res.status(401).json({
      message: "Username/Password is incorrect"
  })
  }
};

/*create workout*/
export const createworkout = async (req, res) => {
  req.body.userid = req.userid;
  const post = req.body;
  console.log(req.body);
  try {
    // connect the database
    let client = await mongoose.connect(process.env.CONNECTION_URL);

    //save data in data base
    const newPost = new creatwork(post);
    console.log(newPost + " " + "new post");
    await newPost.save();

    // Close the Connection
    await client.disconnect();
    console.log("connection closed");
    res.status(201).json(newPost);
  } catch (error) {
    console.log(error + "create work");
    res.status(209).json({ message: error });
  }
};

/*get workout*/
export const getworkout = async (req, res) => {
  req.body.userid = req.userid;
  console.log(req.body);
  try {
    // connect the database
    let client = await mongoose.connect(process.env.CONNECTION_URL);

    //Get data in data base
    const postMessages = await creatwork.find({ userid: req.body.userid });

    // Close the Connection
    await client.disconnect();
    console.log("connection closed");
    res.status(201).json(postMessages);
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
        console.log(error + "error from find id");
        res.status(209).json({ message: "invaild data" });
        await client.disconnect();
        console.log("connection closed");
      } else {
        console.log(resulte);
        if (resulte === null) {
          res.status(209).json({ message: "invaild data" });
          await client.disconnect();
          console.log("connection closed from else");
        } else {
          res.status(201).json(resulte);
          await client.disconnect();
          console.log("connection closed from else");
        }
      }
    });
  } catch (error) {
    console.log(error + "error from find id catch");
    res.status(209).json({ message: "invaild data" });
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
    console.log(post);
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send("Data with this id not avalilable");
    }else{
      console.log("Data availabale----------------------------------------------------------------");
    }
    const editPost = await creatwork.findByIdAndUpdate(_id, post, {
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
              await client.disconnect();
              console.log("database disconected")
            }
   })
 

  // Close the Connection
  // console.log("connection closed");
 
 

  } catch (error) {
    console.log(error +" "+"catch--------------------------------------------------")
    return res.status(404).send('Data with this id not avalilable');
  }
  
}
