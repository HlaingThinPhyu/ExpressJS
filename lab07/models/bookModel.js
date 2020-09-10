const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    title: {type: String, required:true },
    authors: [{firstName: {type:String},lastName: {type:String}}], //OR Array OR [{type: {type:String}}]
    tags: [{type: String}],
    page: {type: Number, default:0},
    published: {type: Number},
});

//(Model Name, Schema Object, Collection Name)
const model = mongoose.model("Book",schema,"books");

module.exports = model;