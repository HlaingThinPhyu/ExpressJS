const express = require("express");

const app = express();

app.get("/",(req,res)=>{
    res.send("Homepage");
});

app.get("/hello",(req,res)=> {
    res.send("hello world");
});
app.get("/hello/world",(req,res)=>  {
    res.send("Another hello world");
});

app.get("/time",(req,res)=>{
    let date = new Date();
    //res.send(" Date: "+ date);
    res.send(`Current Date time: ${date.toISOString()}`);
})

//get is a method, greet is path
app.get("/greet",(req,res)=>{
    let date = new Date();
    let hour = date.getHours();
    
    if(hour>5 && hour<12){
        res.send("Good Morning");
    }else if(hour>=12 && hour < 19){
        res.send("Good Afternoon");
    }else{
        res.status(200).send("Good Evening");
    }
})
app.listen(3000, ()=> {
    console.log('Server is running at port 3000');
});