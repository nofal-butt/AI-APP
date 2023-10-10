import mongoose from "mongoose";
const responseSchema = new mongoose.Schema({
  shop: {
    type: String,
    require: true,
  },
  id: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  tags: {
    type: String,
    require: true,
  },
  productType: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
});

const Response = mongoose.model("Response", responseSchema);
export default Response;
