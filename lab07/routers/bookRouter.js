const express = require('express');
const Book = require("../models/bookModel");

const router = express.Router();

router.route('/books').get((req,res)=>{
    let filter = req.query;
    Book.find(filter,(err,data)=>{
        console.log("Query String "+req.query);
        if(err){
            console.log(err.stack);
            return res.status(500).send(err);
        }
        console.log(data.length);
        res.json(data);
    });
    //res.send("BookRouter: GET/books");
});

router.route('/books/:id').get((req,res)=>{
    Book.findById(req.params.id,(err,data)=>{
        console.log("Query String "+req.query);
        if(err){
            console.log(err.stack);
            return res.status(500).send(err);
        }
        console.log(data.length);
        res.json(data);
    });
});

/*using call back async await way */
// router.route("/books").post(async(req,res)=>{
//     try{
//         let book = new Book(req.body);
//         await book.save();
//         res.status(201).json(book);
//     }catch(err){
//         console.log(err.stack);
//         res.status(500).send(err);
//     }
// });

/*using Promise way*/
/*Save an item */
router.route("/books").post((req,res)=>{
    let book = new Book(req.body);
    book
    .save()
    .then(()=>{
        res.status(201).json(book);
    })
    .catch((err)=>{
        console.log(err.stack);
        res.status(500).send(err);
    });
    
});

/*Update an item */
router.route("/books/:id").put((req,res)=>{
    const id = req.params.id;
    const updates = req.body;
    //Book.findOneAndUpdate()
    Book.findByIdAndUpdate(id,updates,{new:true})
    .then((data)=>{
        if(data){
            return res.json(data);
        }
        return res.status(404).send({message: `Item not found.ID: ${id}`});

    })
    .catch((error)=>{
        return res.status(500).send({error: err});
    });
});

/*Delete an item */
router.route("/books/:id").delete(async(req,res)=>{
    const id = req.params.id;
    try{
        let item = await Book.findByIdAndDelete(id);
        if(item){
            return res.send({message: 'Deleted item with ID = '+id});
        }
        res.status(404).send("Item not found.ID= "+id);
    }catch(err){
        console.log(err.stack);
        res.status(500).send({error:err});
    }
});

module.exports = router;