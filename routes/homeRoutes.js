const express = require('express');
const router = express.Router();
const AUTH = require('../middleware/verifyToken');
const homeController = require('../controllers/homeControllers')



router.get('/home', AUTH, homeController.getAallusers)





module.exports = router