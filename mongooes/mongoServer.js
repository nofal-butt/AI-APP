
import mongoose from "mongoose";
// mongodb+srv://nomanfastnu:nomanfastnu2728@cluster0.ki3afix.mongodb.net/supportBtn
mongoose.connect("mongodb://0.0.0.0:27017/AITOOL").then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.log(err)
});