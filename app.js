require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
require ("./connect/connection");
const cors = require("cors");
const user = require("./model/userModel");
const prod = require("./model/productModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const app = express();
const prodjson = require("./prod.json");
const cookie = require("cookie-session");
const cookieparser = require("cookie-parser");
const passport = require("passport");
const passportSetup = require("./passport");

const port = process.env.PORT || 5000;
var product = JSON.parse(JSON.stringify(prodjson));
console.log(product[0].name);

app.use(express.json());
app.use(cors({
    origin:"http://localhost:3000",
    methods: "GET, POST, PUT DELETE",
    credentials: true
    
}));
app.use(
    cookie({
        name:"sess",
        keys:["shayu"],
    
    })
)

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieparser());
app.post('/api/register', async (req, res) => {

    console.log(req.body);
    try {

        const newPassword = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: newPassword
        });
        res.json({ status: 'ok' });

    } catch (error) {
        res.json({ status: 'error', error: error.message });
    }
});

app.post('/api/login', async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
    })

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

    if (isPasswordValid) {

        const token = jwt.sign({
            name: req.body.name,
            email: req.body.email,
        }, 'SecretkeyHere')

        res.json({ status: 'ok', user: token });
    } else {
        res.json({ status: 'error', user: false });
    }
});
const start = async()=>{
    try{
        await prod.create(prodjson);

    }catch(error){
        console.log(error);
    }
}
start();
app.get("/products", async (req, res) => {
    try {
        const products = await prod.find({});
        res.json(products);
    } catch (error) {
        console.log(error);
    }
});
app.get("/auth/google/callback", passport.authenticate("google",{
    successRedirect:"http://localhost:3000/products",
    failureRedirect:"login/failed"
}))

app.get("/login/failed",(req,res)=>{
    res.status(404).json({
        error:true,
        message:"login failure"
    })
})

app.get("/login/success",(req,res)=>{
    if(req.user){
        res.status(200).json({
            error:false,
            message:"successfully login",
            user:req.user
        })
    }
    else{
        res.status(403).json({
            error:true,
            message:"something went wrong"
        })
    }
})

app.get("/auth/google",passport.authenticate("google",["profile","email"]))
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});