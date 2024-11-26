const mongoose = require('mongoose');

function Connectdb(){
    mongoose.connect("mongodb://127.0.0.1:27017/Userdata");
    console.log('connect to Database');
}
Connectdb();

module.exports = mongoose.connection;