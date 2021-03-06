const user = require('../schemas/userSchema');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const register = async (req, res, next) =>{
    const {name, email, phone, password, jwt} = req.body;
    bcrypt.hash(password, 10, function(err, hashedPass){
        if(err){
            res.json({
                error:err
            })
        }
        let newUser = new user({
            name,
            email,
            phone,
            password: hashedPass,
            
        })
        newUser.save()
        .then(()=>{
            res.json({
                message: 'user Added successfully please login to proceed'
            })
        })
        .catch(error =>{
            res.json({
                message: 'Error in registering user'
            })
        })
    })
}

const login = (req, res, next) =>{
    try{
        const {username, password} = req.body;
        user.findOne({$or: [{email:username}, {phone:username}]})
        .then(user =>{

            if(!user) throw new Error('no user found!');

            bcrypt.compare(password, user.password, function(err, result){

                if(err) throw new Error('err');

                if(!result)throw new Error('password does not match')
                if(result){
                    // send the username with token
                    let token = jwt.sign({id: user.id}, 'verySecretValue', {expiresIn: '24h'})
                    res.json({
                        message: 'user login successfully',
                        token
                    })
                }
            });
        })
    }catch (error){
    res.status(500).json(error);
    }
}



module.exports ={
    register, login
}