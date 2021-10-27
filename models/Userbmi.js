import mongoose from "mongoose";

const Userbmi = mongoose.Schema({
  height: { type:Number, require: true, },
  weight: { type:String, require: true, },
  bmi: { type:String, require: true, },
  bmiresult: {type: String, require: true, },
  userid:{type:String,require: true,}
});

const UserbmI = mongoose.model("UserbmI", Userbmi);

export default UserbmI;
