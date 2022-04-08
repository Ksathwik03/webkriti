const Room = require("../models/room");


exports.allocateRoom = async(req,res) => {
    try{
        
        const {EnrollmentNumber,student_name,MobileNumber} = req.body
        const roomNumber = req.params.rid

        const room = {
            student_name: student_name,
            roomNumber: roomNumber,
            MobileNumber: MobileNumber,
            isEmpty: false,
            EnrollmentNumber: EnrollmentNumber,
        }

        await Room.findOneAndUpdate({roomNumber:roomNumber}, room)
        return res.json({
            stats: 200,
            sucess: "Successfully created",
            room: room
        }) 
    }
    catch(err){
        return res.json({
            stats: 400,
            sucess: false,
            message: `some error ${err}`
        }) 
    }
}

exports.vacateRoom = async(req,res) => {
    try{
        
        const roomNumber = req.params.rid
        const room = {
            student_name: '',
            roomNumber: roomNumber,
            MobileNumber: '',
            isEmpty: true,
            EnrollmentNumber: '',
        }

        await Room.findOneAndUpdate({roomNumber:roomNumber}, room)
        return res.json({
            stats: 200,
            sucess: "Successfully updated"
        }) 
    }
    catch(err){
        return res.json({
            stats: 400,
            sucess: false,
            message: `some error ${err}`
        }) 
    }
}


exports.getAllRooms = async(req,res) => {
    try{
        let room = await Room.find({})
        return res.json({
            stats: 200,
            sucess: "Successfully fetched allocated rooms",
            products: room
        }) 
      }
    catch(err){
        return res.json({
            stats: 400,
            sucess: false,
            message: `some error ${err}`
        }) 
    }
}

