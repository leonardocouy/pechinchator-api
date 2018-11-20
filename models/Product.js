const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    default: Date.now
  },
  removedAt: {
    type: Date,
  },
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
