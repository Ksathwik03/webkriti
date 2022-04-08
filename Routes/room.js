const express = require("express");
const { 
    allocateRoom,vacateRoom,getAllRooms
} = require("../controllers/roomController");

const router = express.Router();

router.post('/allocate/:rid', allocateRoom)
router.post('/vacate/:rid',vacateRoom)
router.get('/',getAllRooms)
module.exports = router;
