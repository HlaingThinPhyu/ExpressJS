const jwt = require("jsonwebtoken");

const jwt_key = "my-secret";
const payload = {name: "Alex", age:18};
let token = jwt.sign(payload,jwt_key,{expiresIn: "1h"});
console.log(token); //whoever have this token, can access yr api

//iat: issued at /timestamp when this token is issued
//exp: expired at
jwt.verify(token,jwt_key,(err,data)=>{
    if(err){
        console.log("Verification error ",err);
    }else{
        console.log("Verified data: ",data);
    }
});