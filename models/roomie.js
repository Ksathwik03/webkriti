const mongoose = require('mongoose');

const roomieSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  student_name : {
      type: String,
      required: true
  },
  About :{
    type: String,
    required: true
  },
  
},{ timestamps: true });


const Product = mongoose.model('Product', roomieSchema);
module.exports = Product;