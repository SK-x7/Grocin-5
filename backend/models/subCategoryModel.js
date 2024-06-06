const mongoose = require('mongoose');
// const { nanoid } = require('nanoid');


const subcategorySchema = new mongoose.Schema({
  uniqueId:{
    type: String,
    required: true,
    // default:()=>nanoid(),
    unique: true
  },
  name: {
    type: String,
    required: true,
  },
  image:String,
  products: [{
    unique: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  }],
  active: {
    type: Boolean,
    default: true,
    select: false
  }
});

const Subcategory = mongoose.model('Subcategory', subcategorySchema);

module.exports = Subcategory;
