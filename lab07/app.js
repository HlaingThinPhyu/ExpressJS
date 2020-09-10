const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const bookRouter = require("./routers/bookRouter");
require("./models/db");

console.log(process.env.PORT);
console.log(process.env.DATABASE_URL);

const app = express();

const mongoose = require("mongoose");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bookRouter);

app.get("/",(req,res)=>{
    res.send("HomePage");
});


//localhost:3000/
app.listen(3000, ()=> {
    console.log('Server is running at port 3000');
});




