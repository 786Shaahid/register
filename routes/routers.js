const route = require("express").Router();
const Persons = require("../models/user");
const bcrypt=require('bcrypt');
const {loginValidate,registrationValidate}=require("../validator")        

route.get("/", (req, res) => {
  res.render("home");
});
route.get("/registration", (req, res) => {
  res.render("registration");
});
route.get("/login", (req, res) => {
  res.render("login");
});

route.post("/registration", async (req, res) => {
  const {error}= registrationValidate({
    username:req.body.username,
    email:req.body.email,
    password:req.body.password,
  });
  if(error) {
    // console.log("err hai bhai",error);
    return res.status(400).send(error.message) }
    
    // if email exits
    const userExits=await Persons.findOne({email:req.body.email});
     if(userExits){ 
      // console.log(userExits);
      return res.status(400).send(' This email is already exists !');
     }
    // hashing the password
    const saltGen=await bcrypt.genSalt(10);
    const hashPass=await bcrypt.hash(req.body.password,saltGen); 
    
    
    try {
      const pass = req.body.password;
      const cpass = req.body.conformpassword;
      
      if (pass === cpass) {
      const personData = new Persons({
        username: req.body.username,
        email: req.body.email,
        password: hashPass,
      });
      const pdata = await personData.save();
      res.status(200).render("login");
    } else {
      res.send("Password and conform Password doesn't match");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


route.post("/login", async (req, res) => {
    const user = await Persons.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send("Email doesn't exits !");
    }
   const comparePass= await bcrypt.compare(req.body.password,user.password);
  if(!comparePass){
    return res.status(400).send('Invalid password');
  }
  res.status(200).render("profile");
  
});


route.delete('/:id',async(req,res)=>{
  try{
    const user= await Persons.findByIdAndDelete(req.params.id)
    res.status(200).send("deleted successfully")
  }catch(err){
    res.status(500).send(err)
  }
         
    })



module.exports = route;
