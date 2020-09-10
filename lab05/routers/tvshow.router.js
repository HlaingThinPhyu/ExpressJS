const express = require("express");
let data = require("../data");

// const data = [
//     { id: 1, title: 'Game of Thrones' },
//     { id: 2, title: 'Stranger Things' },
//     { id: 3, title: 'The Walking Dead' },
//     { id: 4, title: 'The 100' },
//     { id: 5, title: 'Arrow' },
//     ]

const router = express.Router();
 
const sorting = (order)=>{
    let f = null;
    if(order == "asc"){
        return(a,b) => (a.title < b.title ? -1:1);
    } else if(order == "desc"){
        return (a,b)=> (a.title < b.title ? 1: -1);
    } else{
        return undefined;
    }
}
router.route('/data').get((req,res)=>{
    console.log("Query strings : ",req.query);

    //Filtering
    let result = {};
    if(req.query.title){
        result = data.filter((item) =>{
            return item.title
            .toLowerCase()
            .includes(req.query.title.toLowerCase());
        } );
    }else{
        result = data;
    }

    //Sorting
    let f = sorting(req.query.sorted);
    result.sort(f);
    // if(req.query.sorted == 'asc')
    // {
    //     result.sort((a,b)=> (a.title < b.title ? -1:1));
    // } else if(req.query.sorted == "desc"){
    //     result.sort((a,b) => (a.title < b.title ? 1:-1));
    // }
    res.json({result, count: data.length});
});

// const name = "Alex";
// const age = 18;

router.route("/demo/:x/:y?/:z?").get((req,res)=>{
    console.log(req.params);
    res.json(req.params);
})

router.route("/data/:id").get((req,res)=>{
    const result = data.filter((item)=> item.id == req.params.id);
    if(result.length == 0){
       res.status(404).send(`Not found ${req.params.id}`);
    }
    res.json(result[0]);
})

router.route("/data/:id/:case?").get((req,res)=>{
    const x = req.params.case;
    const result = data.filter((item)=> item.id == req.params.id);
    if(result.length == 0){
        res.status(404).send(`Not found ${req.params.id}`);
     }
    let item = result[0];
    if(x == "upper"){
        item.title = item.title.toUpperCase();
        console.log("upper case result "+ item.title);
    }
    else if(x == 'lower'){
        item.title = item.title.toLowerCase();
    }
    
    console.log('Result of case '+item.title);
    res.json(result[0]);
});

/*Save an item*/
router.route("/data/").post((req,res)=>{
    let item = req.body;
    data.push(item);
    items = data.slice(-1);
    res.json(items[0]);
});

/* Update an item */
router.route("/data/:id").put((req,res)=>{
    let input = req.body;
    console.log("PUT method");
    console.log(input);
    let id = Number(req.params.id);

    let updateItem= {...input, id};
    //find existing item in the list
    let index = data.findIndex((item)=> (item.id == req.params.id));

    if(!data[index]){
        res.status(404).json({message: `Item with id ${id} not found`});
        return;
    }

    data.splice(index, 1 , updateItem);
    // res.send(`Updating item ${req.params.id}:${JSON.stringify(input)}`);
    res.json(data[index]);
})

/* Delete an item */
router.route("/data/:id").delete((req,res)=>{
    console.log(req.params.id);
    let id = Number(req.params.id);
    let index = data.findIndex((item)=> id == item.id);
    if(!data[index]){
        return res.status(404).json({message: `Item with id ${id} not found`});
    }
    item = data.splice(index,1);
    console.log(item);
    res.send(`Delete item with id ${req.params.id}`);
})
module.exports = {router};


