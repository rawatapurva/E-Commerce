const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  productId: { type: String, required: true }, // store product id (from fakestore or your product)
  title: String,
  price: Number,
  image: String,
  quantity: { type: Number, default: 1 },
  description: String
}, { _id: false });

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  cart: { type: [CartItemSchema], default: [] } // ← user-specific cart
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
