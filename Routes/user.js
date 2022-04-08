const express = require("express");

const { 
    addProfile,login,logoutUser
} = require("../controllers/authController");

const router = express.Router();

router.post('/addprofile', addProfile)
router.post('/login',login)
router.get('/logoutuser',logoutUser)
module.exports = router;
