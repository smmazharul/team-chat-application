// external import 
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const loginRouter = require('./router/loginRouter')
const usersRouter = require('./router/usersRouter')
const inboxRouter = require('./router/inboxRouter')

//internal import 
const {notFoundHandler,errorHandler}=require('./middlewares/common/errorHandeler')

const app = express();
require('dotenv').config();

// database connection

mongoose.connect(process.env.MONGO_CONNECTION_STRING)
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });
// request parsers
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// set view engine 

app.set("view engine","ejs");

// set static folder 

app.use(express.static(path.join(__dirname, "public")));

// parse cookies 
app.use(cookieParser(process.env.COOKIE_SECRET));


// routing setup
app.use('/',loginRouter);
app.use('/users',usersRouter);
app.use('/inbox',inboxRouter);


// error handling 404 
app.use(notFoundHandler)

//common error handler 
app.use(errorHandler)



app.listen(process.env.PORT,()=>{
    console.log(`app listening to port ${process.env.PORT}`)
})
