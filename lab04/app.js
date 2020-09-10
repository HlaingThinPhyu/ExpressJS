const express = require("express");
const {router} = require("./routers/helloRouter");
console.log("Router output ",router);
//const obj = require("./routers/helloRouter");
const app = express();

//app.use("/hello",obj.router);

app.use("/api",router);

app.get("/",(req,res)=>{
    //console.log(obj.name," ",obj.age);
    res.send("Homepage");
});

//localhost:3000/
app.listen(3000, ()=> {
    console.log('Server is running at port 3000');
});




