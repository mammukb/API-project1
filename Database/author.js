const mongoose = require('mongoose');


// create a book schema
const authorSchema = mongoose.Schema(
   {
      id : Number,
       name : String, 
       books : [String]
   }
);

// create a book model
const authorModel = mongoose.model("authors", authorSchema);


module.exports = authorModel;