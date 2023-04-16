const route = require("express").Router();
const Persons = require("../models/user");

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
  try {
    // console.log("this is body", req.body);
    const pass = req.body.password;
    const cpass = req.body.conformpassword;
    if (pass === cpass) {
      const personData = new Persons({
        username: req.body.username,
        email: req.body.email,
        password: pass,
        conformpassword: cpass,
      });
      const pdata = await personData.save();
      res.status(200).render("login");
    } else {
      res.send("Password and conform Password is not match");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
route.post("/login", async (req, res) => {
  try {
    const user = await Persons.findOne({ email: req.body.email });
    if (!user) {
      return res.status(500).send("Email doesn't exits !");
    }
    if (user.password !== req.body.password) {
      return res.send("Wronge password !");
    }
    res.status(200).render("home", {
      title: {},
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = route;
