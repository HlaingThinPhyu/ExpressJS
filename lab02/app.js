const express = require('express');

const app = express();

const handler = (req,res)=>{
    console.log(req.method," ",req.originalUrl);
    console.log(req.headers);
    //res.send(`<h1>Endpoint method ${req.method} at Path ${req.originalUrl}</h1>`);
    res.format({
        "text/html": ()=>{
            res.send(`<h1>Method ${req.method}, Path ${req.originalUrl}</h1>`);

        },
        "text/plain":()=>{
            res.send(`Method ${req.method}, Path ${req.originalUrl}`);
        },
        "application/json":()=>{
            res.send({method :`${req.method}`, Path :`${req.originalUrl}`});
        },
        default:()=>{
            res.status(406).send("Not acceptable");
        },
    });
};
app.get('/hello',handler);

app.post('/foo',handler);

app.put('/bar',handler);

app.delete('/foo/bar',handler);

app.get("/time",(req,res)=>{
    console.log(req.headers.accept);
    let date = new Date();
    res.format({
        "text/html" :()=>{
            res.send(`<h1>${date.toISOString()}</h1>`)
        }
    })
})

app.listen(3000,()=>{
    console.log("Server on port 3000 is running");
})