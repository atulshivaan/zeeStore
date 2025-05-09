import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    trim: true, // Trims leading/trailing spaces
  },
  productType: {
    type: String,
    required: true,
    trim: true,
  },
  available: {
    type: Boolean,
    default: true, 
  },
  
  productDescription: {
    type: String,
    trim: true, 
    maxlength: [500, 'Description is too long!'],
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price must be a positive value'],
  },
  category: {
    type: String,
    default: 'General',
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;
