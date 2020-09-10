const express = require("express");
const path = require("path");
const qr = require("qr-image");
const fs = require("fs");
const {v4:uuidv4} = require("uuid");

const app = express();

//app.use("/hello",obj.router);

app.get("/",(req,res)=>{
    res.send("QR");
});
let options = {type:"png"};

const getRespType = (type)=>{
    if(options.type == "svg"){
        return "svg";
    } else if(options.type == "pdf"){
        return "application/pdf";
    }
    return "image/png";
};

app.get("/qr-async/:data", async(req,res)=>{
    try {
        let options = {type: "png",...req.query};
        const code = await qr.image(req.params.data, options);
        console.log("typeeee "+ options.type);
        let restype = getRespType(options.type);
        res.type(restype);
        code.pipe(res);
    } catch (err) {
        console.log(err.stack);
        res.status(500).send(err);
    }
});
app.get("/qr/:data",async(req,res)=>{
    /* Synchronous Mode */
    try
    {
        let options = {type: "png", ...req.query};
        const code = qr.imageSync(req.params.data, options);
        const filePath = path.join(__dirname,"images",uuidv4()+ "."+options.type);
        fs.writeFileSync(filePath,code);
        console.log(filePath);
        
        let restype = getRespType(options.type);
        res.type(restype);
        res.sendFile(filePath); 
    }catch(err){
        console.log(err.stack);
        return res.status(500).send(err);
    }
});

//localhost:3000/
app.listen(3000, ()=> {
    console.log('Server is running at port 3000');
});




