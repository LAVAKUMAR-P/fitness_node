import PostMessage from "../models/postMessage.js";
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import  jwt from 'jsonwebtoken';
import  bcryptjs from 'bcrypt';




dotenv.config();



/*regiser user */
export const Register = async (req, res) => {
  console.log(req.body);
    try {
      // connect the database

      let client = await mongoose.connect(process.env.CONNECTION_URL);
      
      //Hash password
      let salt = bcryptjs.genSaltSync(10);
      let hash = bcryptjs.hashSync(req.body.password,salt);
      req.body.password = hash;
      const post = req.body;
      console.log(post)

      //creating schma for data base
      const newPost = new PostMessage(post);


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

export const Login = async (req, res) => {
console.log(req.body);
  try {
    // connect the database

    let client = await mongoose.connect(process.env.CONNECTION_URL);
   
    //get data from data base
    const postMessages = await PostMessage.findOne({ email : req.body.email });

    console.log(postMessages)

    let user=postMessages;

    console.log(user.email+"  "+"user detais");

    if (user) {
      // Hash the incoming password
      // Compare that password with user's password
      console.log(req.body)
      console.log(user.password)
      let matchPassword = bcryptjs.compareSync(req.body.password, user.password)
      if (matchPassword) {
        // Generate JWT token
        let token = jwt.sign({ id: user._id },process.env.JWT_SECRET)
        console.log(token+"token")
        res.json({
            message: true,
            token
        })
    }
  } else {
      res.status(404).json({
          message: "Username/Password is incorrect"
      })
  }  
    // Close the Connection
    await client.disconnect();
  } catch (error) {
    console.log(error)
    res.status(209).json({message: error});
  }
}

