// const { nanoid } = require('nanoid');
const mongoose = require('mongoose')


const categorySchema = new mongoose.Schema({
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
  subcategories: [
    {
    //unique: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subcategory',
  }],
  active: {
    type: Boolean,
    default: true,
    select: false
  }
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;


// FIXME active field retrive horhi h get pr