import mongoose from "mongoose";

const Workout = mongoose.Schema({
  type: { type: String, require: true },
  calories: { type: Number, require: true },
  set: { type: Number, require: true },
  unit: { type: String, require: true },
  catg: { type: String, require: true },
  userid: { type: String, require: true },
  date: { type: String, require: true },
});

const WorkouT = mongoose.model("WorkouT", Workout);

export default WorkouT;
