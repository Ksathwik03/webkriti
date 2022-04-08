const Roomie = require("../models/roomie");
const User = require("../models/user");
const crypto = require("crypto");

exports.getRoomie = async(req,res) => {
    try{
        const token = req.body.token;
        const {product_name,product_link,bank} = req.body
        const user = await User.findOne({'token': token})
        if(!user){
            return res.json({
                stats: 400,
                sucess: false,
                message: "Auth token required"
            })
        }
        const chat_id = crypto.randomBytes(12).toString('hex');
        const product = new Product({
            userId: user._id,
            product_name : product_name,
            product_link: product_link,
            bank: bank,
            chat_id: chat_id,
            admin_details: {
                "admin_id": "i394neuIHS0",
                "admin_name": "admin"
            },
        })
        await product.save()
        return res.json({
            stats: 200,
            sucess: "Successfully created",
            product: product
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

exports.updateRomie = async(req,res) => {
    try{
        const token = req.body.token;
        const {dealStatus} = req.body
        const user = await User.findOne({'token': token})
        if(!user || !(user.admin)){
            return res.json({
                stats: 400,
                sucess: false,
                message: "Auth token required"
            })
        }
        const product = await Product.findOne({'_id': req.params.pid})
        product.dealStatus = true
        await product.save()
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

exports.getUserProducts = async(req,res) => {
    try{
        const token = req.body.token;
        const user = await User.findOne({'token': token})
        console.log(user)
        if(!user){
            return res.json({
                stats: 400,
                sucess: false,
                message: "Auth token required"
            })
        }
        // console.log(user)
        const id = user._id
        let products
        if(user.admin == true){
            products = await Product.find({})
        }
        else{
        products = await Product.find({"userId": id})
        }
        return res.json({
            stats: 200,
            sucess: "Successfully found user products",
            products: products
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
