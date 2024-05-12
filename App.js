const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const app = express();
const Port = 4444;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs'); 

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/Ecommerse'})
}));

const passport = require("./authentication/passport");

app.use(passport.initialize());
app.use(passport.session());


app.use("/", require("./routes/home"));

app.use("/admin", require("./routes/admin"));

app.use("/shop", require("./routes/shop"));

mongoose.connect('mongodb://127.0.0.1:27017/Ecommerse')
.then(()=>{
    app.listen(Port ,()=>{
        console.log("Server Running at", Port);
    })
}).catch((e)=>{
    console.log(e);
})    