const mongoose = require('mongoose');


// create a book schema
const publicationSchema = mongoose.Schema(
   {
    id : Number,
       name : String, 
       books : [String]
   }
);

// create a book model
const publicationModel = mongoose.model("publications", publicationSchema);


module.exports = publicationModel;