import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  email: String,
  firstName: String,
  lastName: String,
  password: String,
});

const PostMessage = mongoose.model("Register", postSchema);

export default PostMessage;
