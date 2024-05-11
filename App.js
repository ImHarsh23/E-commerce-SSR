const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const Port = 4444;

// Set EJS as templating engine 

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');

const users = require("./models/users");

const adminRouter = require("./routes/admin"); 
const shopRouter = require("./routes/shop"); 

app.use(async(req, res, next)=>{
    let user = await users.findOne({_id:"662aec3e260d77c5c1117b7c"});
    req.user = user;
    // user.cart = [];
    // req.user.save();
    next();
});

const homeRouter = require("./routes/home");

app.use("/", homeRouter);

app.use("/admin", adminRouter);
/*you are telling your Express application to use the adminRouter middleware for any routes that start with /admin. 
This means that any HTTP request that matches a route under /admin will be passed to the adminRouter for handling.*/

app.use("/shop", shopRouter);



mongoose.connect('mongodb://127.0.0.1:27017/Ecommerse')
.then(()=>{
    app.listen(Port ,()=>{
        console.log("Server Running at", Port);
    })
}).catch((e)=>{
    console.log(e);
})    