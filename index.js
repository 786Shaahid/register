const express=require("express");
const mongoose=require('mongoose');
const ejs=require('ejs');
const port=4000;

const app = express();

 mongoose.connect("mongodb://127.0.0.1:27017/registerDB");
 const registerdb =mongoose.connection;
  registerdb.once('open',()=>{
    console.log("Connect to mongodb");
  })

app.set('view engine','ejs')

app.use(express.json());
// app.use(express.urlencoded());
app.use(express.urlencoded({extended: false}));

const personSchema=require('./routes/routers')
app.use('/api/users',personSchema);




app.listen(port,(err)=>{
    if(err){
        console.log('there are getting error on this port',port);
    }
    console.log(`You are running on port: ${port}`);
})