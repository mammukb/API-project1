const mongoose = require('mongoose');


// create a book schema
const BookSchema = mongoose.Schema(
   {
    ISBN : String,
    title: String,
    PubDate : String,
    language : String,
    numPage : Number,
    authors : [Number],
    publications : [Number],
    category : [String]
   }
);

// create a book model
const BookModel = mongoose.model("books", BookSchema);


module.exports = BookModel;