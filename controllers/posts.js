
import PostMessage from "../models/postMessage.js";
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import  jwt from 'jsonwebtoken';
import  bcryptjs from 'bcrypt';

dotenv.config();
/*regiser user */
export const createPost = async (req, res) => {

    const post = req.body;
    console.log(post)

    const newPost = new PostMessage(post);
    try {
      // connect the database

      let client = await mongoose.connect(process.env.CONNECTION_URL);

      //save data in database
      await  newPost.save()    
      
      // Close the Connection
      await client.disconnect();
      console.log("connection closed")
      res.status(201).json(newPost)

    } catch (error) {
    
      res.status(209).json({message: error});

    }
}

/*log in*/

export const getPost = async (req, res) => {

  const post = req.body;
  console.log(post)

  const newPost = new PostMessage(post);
  try {
    // connect the database

    let client = await mongoose.connect(process.env.CONNECTION_URL);

    //save data in database
    const postMessages = await PostMessage.findOne({ username: req.body.username });;
      
    if (user) {
      // Hash the incoming password
      // Compare that password with user's password
      console.log(req.body)
      console.log(user.password)
      let matchPassword = bcryptjs.compareSync(req.body.password, user.password)


      if (matchPassword) {
        // Generate JWT token
        let token = jwt.sign({ id: user._id },process.env.JWT_SECRET)
        res.json({
            message: true,
            token
        })
        console.log(token+"token")
    }
  } else {
      res.status(404).json({
          message: "Username/Password is incorrect"
      })
  }  
    
    // Close the Connection
    await client.disconnect();
    console.log("connection closed")
    res.status(201).json(postMessages)

  } catch (error) {
  
    res.status(209).json({message: error});

  }
}


