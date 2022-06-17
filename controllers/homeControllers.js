const user = require('../schemas/userSchema');


const getAallusers = (req, res, next) =>{
    try{
        user.find().then((user)=>{
            res.json({
                user
            })
        })
    } catch(error) {
        res.status(500).json({
            message: 'some error getting user',
            error 
        })
    }
}


module.exports = {getAallusers}