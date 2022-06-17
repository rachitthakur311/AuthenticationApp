const express = require("express");
const dotenv = require("dotenv");
const mongoose =require("mongoose");
const morgan = require('morgan');
const bodyParser = require('body-Parser');
const AuthRoute = require('./routes/auth');
const homeRoutes = require('./routes/homeRoutes')
const http = require('http');
const app = express();
dotenv.config({path:'./config/config.env'});

// const mongoUrl =  'mongodb+srv://auth123:jsYkuUrgE0WkFYF5@authapp.kiuv8rf.mongodb.net/auth123?retryWrites=true&w=majority'
const mongoUrl = 'mongodb://auth123:jsYkuUrgE0WkFYF5@ac-fj1epmj-shard-00-00.kiuv8rf.mongodb.net:27017,ac-fj1epmj-shard-00-01.kiuv8rf.mongodb.net:27017,ac-fj1epmj-shard-00-02.kiuv8rf.mongodb.net:27017/auth123?ssl=true&replicaSet=atlas-comf6g-shard-0&authSource=admin&retryWrites=true&w=majority'


const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
mongoose.connect(mongoUrl, mongoOptions).then(()=>{
    console.log("mongodb is connect!");
    app.emit("mongoConnected");
})
.catch(err =>{
    console.log(err)
});




app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api/auth',AuthRoute)
app.use('/api',homeRoutes)



const Port = process.env.Port || 8080
app.listen(Port, 
    console.log(`server is running in ${process.env.NODE_ENV} mode on port ${Port}`))