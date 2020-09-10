const express = require('express');
const path = require("path");
const app = express();

app.use((req,res,next)=>{
    console.log("I am in middleware");
    next();
});

app.use("/static",express.static(path.join(__dirname,"public")));

const handler = (req,res)=>{
    console.log("I am in handler");
    // console.log(req.method," ",req.originalUrl);
    // console.log(req.headers);
    res.send(`<h1>Endpoint method ${req.method} at Path ${req.originalUrl}</h1>`);
    
};

app.get("/about",(req,res)=>{
    res.redirect("/static/about.html");
})
app.get('/hello',handler);
app.get('/abc', ()=>{
    throw new Error("Hahaha");
})

app.use((req,res)=>{
    res
    .status(404)
    //.send(`<h1>Sorry, path not found ${req.method} ${req.originalUrl}`);
    //.redirect("/static/404.hmtl");
    .sendFile(path.join(__dirname,"/public","404.html"));
})

app.use((err,req,res,next)=>{
    res
    .status(500)
    //.send(`<h1> Sorry, something broken.</h1> <p>${err}</p>`);
    .redirect("/static/500.html");
})

app.listen(3000,()=>{
    console.log("Server on port 3000 is running");
})