const data = require("../data");

console.log( 1 === "1"); //false no type conversion
console.log( 1 == "1"); // true type conversion

data.slice(-1); // return the subset of data , this one return last item
data.splice(index,0 , updateItem); // going to replace first item with new item