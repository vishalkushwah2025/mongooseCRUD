const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dbConnection = require('./config/config')
const userModel = require('./models/user.model');

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.set('view engine' , 'ejs');

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/user-data', (req, res) => {
    res.send('data-received');
    console.log(req.body);
})

app.get('/register' , (req , res) => {
    res.render('register')
})
app.post('/register' ,async (req , res) => {
    const {username, email, password} = req.body;
    const newUser = await userModel.create({
        username,
        email,
        password
    })
    res.send(newUser)    
})

app.get('/get-user', (req, res) => {
    userModel.find().then((users => {
        res.send(users)
    }))
})
app.get('/get-oneuser', (req , res) => {
    userModel.findOne({
        username : "c"
    }).then((user)=> {
        res.send(user)
    })
})
app.get('/update-user', async (req , res) => {
    await userModel.findOneAndUpdate({
        username : 'vishal'
    },{
        email: "police@gmail.com"
    })
    res.send("user-updated")
})
app.get('/delete-user', async(req, res) => {
    await userModel.findOneAndDelete({
        username: "vishal"
    })
    res.send("user-deleted")
})
 

app.listen(3000 , () => {
    console.log('server is running on port 3000');
})