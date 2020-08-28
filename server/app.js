const express = require('express');
const dotenv = require('dotenv');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const cors = require("cors");

let Item = require('./item.model');

// Private ENV Setup
dotenv.config();
const PORT = process.env.PORT;
const DBURL = process.env.DBURL;

// Express Setup

app.use(bodyParser.json());
app.use(cors());

// Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = DBURL;
mongoose.connect(mongoDB, {useNewUrlParser:true, useUnifiedTopology: true});
var db = mongoose.connection;
db.once("open", () => {console.log("Connection to MongoDB was successful")});
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// API Endpoints
	
//  Get all Items
router.route("/").get(function(req, res) {
    Item.find(function(err, items) {
      if (err) {
        res.send(err);
      } else {
        res.send(items);
      }
    });
  });

// Delete all items
router.route("/clear").delete(function(req,res){
    Item.deleteMany({}).then(function(){ 
        console.log("Data deleted"); // Success 
    }).catch(function(error){ 
        console.log(error); // Failure 
    }); 
});

// Get a specific Item
router.route("/:id").get(function(req, res){
    let id = req.params.id;
    Item.findById(id,function(err,item){
        res.json(item);
    });
});

// Add new Item
router.route("/add").post(function(req, res) {
    let newItem = new Item(req.body);
    newItem.save()
        .then(newItem => {
            console.log('Item Added');
            res.redirect('/items');
        })
        .catch(err => {
            res.status(400).send('An error occured during process');
        });
});

// Delete a specific item
router.route("/delete/:id").get(function(req, res){
    let id = req.params.id;
    Item.findByIdAndDelete(id, function (err){
        if (err) console.log(err);
        else {
            console.log('Deletion Complete');
            res.redirect('/items');
        }
    })
});

// Updating existing item
router.route("/update/:id").post(function(req,res){
    Item.findById(req.params.id, function (err,item){
        if(!item)
            res.status(404).send("Data not found");
        else
            item.isDone = req.body.isDone;
        
        item.save().then(item =>{
            res.redirect('/items');
        }).catch(err => {
            res.status(400).send('Update not possible');
        })
    })
})

// Wrapping

app.use("/items", router);
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});