import express  from "express";
import cors from "cors";
import dotenv from 'dotenv';
const PORT=3001;
const app = express();
dotenv.config();
import postRoutes from './routes/posts.js'



app.use(
    cors({
      origin: "*",
    })
  );




app.use(express.json());

app.use('/', postRoutes)

app.listen(PORT, function () {
  console.log(`Server is Listening ${PORT}`);
});