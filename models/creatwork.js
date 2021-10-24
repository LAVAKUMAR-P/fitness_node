import mongoose from "mongoose";

const creatworkSchema = mongoose.Schema({
    message: Object,
    userid: String,
});

const creatwork = mongoose.model("creatwork", creatworkSchema);

export default creatwork;
