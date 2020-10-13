import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Name is required",
  },
  image: {
    data: Buffer,
    contentType: String,
  },

  description: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    desc: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: "Quantity is required",
  },
  price: {
    type: Number,
    required: "Price is required",
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
  age: {
    type: Number,
  },
  floor: {
    type: Number,
  },
  bathrooms: {
    type: Number,
  },
  rooms: {
    type: Number,
  },
  balcony: {
    type: Boolean,
    default: false,
    required: false,
  },
  furniture: {
    type: Boolean,
    default: false,
    required: false,
  },
  sale: {
    type: Boolean,
    required: false,
  },
  rent: {
    type: Boolean,
    required: false,
  },

  shop: { type: mongoose.Schema.ObjectId, ref: "Shop" },
});

export default mongoose.model("Product", ProductSchema);
