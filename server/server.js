require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
   
});

const db = mongoose.connection;
db.once('open', () => console.log("Successfully Connected to Database"));

const noteSchema = {
    title: String, 
    content: String
};



const note = mongoose.model("note",noteSchema);

app.get("/", function (req,res){
    
    note.find((err,result) => {
        if(err){
            console.log(err);
        } else{
            res.json(result);
            
            console.log("Responded to Get Request on /");
            // console.log(result);
        }
    });
});

app.post("/add", function(req,res){

    const newNote = new note(req.body);
    newNote.save();

    console.log("New Note Added Successfully");
    // console.log(req.body);
});

app.post("/delete", function(req,res){

    const noteTitle = req.body.title;
    const noteContent = req.body.content;

    note.findOneAndDelete({title: noteTitle, content: noteContent}, (err) => {
        if(err){
            console.log(err);
        } else{
            console.log("Note Deleted Successfully");
            // console.log(req.body);
        }
    });
});

const port = process.env.PORT
app.listen(process.env.PORT || 4000, function() {
  console.log(`Example app listening at http://localhost:${port}`);
});
