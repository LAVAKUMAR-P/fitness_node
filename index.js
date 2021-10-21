const express = require("express");
const app = express();
const bcryptjs = require('bcrypt');
const cors = require("cors");
const mongodb= require("mongodb");
const mongoClient = mongodb.MongoClient;
const url="mongodb://localhost:27017";
const PORT=3001;

app.use(
    cors({
      origin: "*",
    })
  );


app.use(express.json());

app.post("/register", async function (req, res) {
    try {
        console.log(req.body.password);
        // Connect the Database
        let client = await mongoClient.connect(url)
  
        // Select the DB
        let db = client.db("Fitness_app");
  
        // Hash the password
        console.log(req.body.password);
        let salt = bcryptjs.genSaltSync(10);
        let hash = bcryptjs.hashSync("123",salt);
        req.body.password = hash;
       // console.log(hash);
  
        // Select the Collection and perform the action
        let data = await db.collection("users").insertOne(req.body)
  
        // Close the Connection
        await client.close();
        
  
        res.json({
            message: "User Registered",
            id: data._id
        })
    } catch (error) {
          console.log(error);
          res.json({
            message: "Registeration failed"
        })
    }
  })

app.listen(PORT, function () {
    console.log(`Server is Listening ${PORT}`);
  });