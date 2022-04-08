const express = require("express");
const { 
    findRoomie,deleteReq,getAllRoomie
} = require("../controllers/roomieController");

const router = express.Router();

router.post('/delete', deleteReq)
router.post('/find',findRoomie)
router.get('/',getAllRoomie)
module.exports = router;
