import mongoose from "mongoose";

const RegisterSchema = mongoose.Schema({
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
  admin: {
    type: Boolean,
    require: true,
  }
});

const registerSchema = mongoose.model("registerSchema",RegisterSchema);

export default registerSchema;
