const mongoose = require('mongoose');
const express = require('express');
const app = express();



mongoose.connect('mongodb://127.0.0.1:27017/memberDatabase', { useNewUrlParser: true,  useUnifiedTopology: true});

let dbConn;

try{
    dbConn = mongoose.connection;
    dbConn.on('error', () => {
        console.log("mongoDB error");
    });
    
    dbConn.once('open', () => {
        console.log("mongoDB connected");
    })

    dbConn.on('reconnect', () => {
        console.log("Reconnected...");
    })
}catch (err){
    console.log("Error : " + err);
}

let Router = require('./routes/server.routes');
app.use('/', Router());

app.listen('4000', () => {
    console.log("Server listening...");
});

