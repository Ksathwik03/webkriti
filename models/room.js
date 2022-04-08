const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  isEmpty: {
      type: Boolean,
      default: false
  },
  EnrollmentNumber: {
    type: String,
    // required:true
  },
  student_name : {
      type: String,
    //   required:true
  },
  hostel :{
    type: String,
  },
  roomNumber :{
      type: Number,
      unique: true
    //   required: true
  },
  MobileNumber :{
    type: String,
  }
  
},{ timestamps: true });


const Room = mongoose.model('Room', roomSchema);
module.exports = Room;