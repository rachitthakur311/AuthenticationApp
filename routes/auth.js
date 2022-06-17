const express = require("express")
const router = express.Router()

const userController = require('../controllers/userController')


// post routes
router.post('/register', userController.register)
router.post('/login', userController.login)


module.exports = router