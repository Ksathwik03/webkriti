const mongoose = require('mongoose');

const roomieSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  student_name : {
      type: String,
      required: true
  },
  description :{
    type: String,
    required: true
  },
  rool_no :{
    type: String,
    required: true
  }
  
},{ timestamps: true });


const Product = mongoose.model('Product', roomieSchema);
module.exports = Product;