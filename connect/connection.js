const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://Shayanika:Shayanika1234@cluster0.4tdcpvu.mongodb.net/nurseryProject").then(()=>{
    console.log("connection successfull");
}).catch((err)=>{
    console.log(err);
})