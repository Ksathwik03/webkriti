const Roomie = require("../models/roomie");


exports.findRoomie = async(req,res) => {
    try{        
        const {email,student_name,About} = req.body
        
        const roomie = new Roomie({
            student_name: student_name,
            email: email,
            About: About,
        })

        await roomie.save()
        return res.json({
            stats: 200,
            sucess: "Successfully created",
            room: roomie
        }) 
    }
    catch(err){
        return res.json({
            stats: 203,
            sucess: false,
            message: `some error ${err}`
        }) 
    }
}

exports.deleteReq = async(req,res) => {
    try{
        
        const {email} = req.body

        await Roomie.findOneAndDelete({'email':email})
        
        return res.json({
            stats: 200,
            sucess: "Successfully updated"
        }) 
    }
    catch(err){
        return res.json({
            stats: 203,
            sucess: false,
            message: `some error ${err}`
        }) 
    }
}


exports.getAllRoomie = async(req,res) => {
    try{
        let roomie = await Roomie.find({}).sort('roomNumber')
        return res.json({
            stats: 200,
            sucess: "Successfully fetched allocated rooms",
            roomie: roomie
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

