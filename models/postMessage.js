import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
    max: 50,
  },
  firstName: {
    type: String,
    require: true,
    unique: true,
    min: 3,
    max: 20,
  },
  lastName: String,
  password: String,
});

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
