require("dotenv").config(); 

const express = require("express");
var bodyparser = require("body-parser");
const mongoose = require("mongoose");





//Database
      const Database = require("./Database/database");
//const { books } = require("./database");

//Models
const bookModel = require("./Database/books");
const authorModel = require("./Database/author");
const publicationModel = require("./Database/publication");
const BookModel = require("./Database/books");


//Initialise
const   booky = express();
booky.use(bodyparser.urlencoded ({extended : true}));
booky.use (bodyparser.json());
  // connecting mongoose with mongodb
  mongoose.connect( process.env.MONGODB_URL,
   {
   /* useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false*/
  }).then (() => console.log("connection successful") ); 

 /******************GET REQUEST**************/

 /*
 ROuter     :       /
Dsescription:      To get all the books 
Access      :       PUBLIC
Parameters  :        none
Method      :        GET
 */ 
booky.get( "/" , async (req ,res)  => {
   const getAllBooks = await bookModel.find();
    return res.json( { BOOKS : getAllBooks } );
});

 /*
 ROuter     :       /is
Dsescription:      To get specific books based on ISBN 
Access      :       PUBLIC
Parameters  :        isbn 
Method      :        GET
 */ 
booky.get( "/is/:isbn" , async (req ,res) => {

    const getspecifiedbook = await bookModel.findOne({ISBN: req.params.isbn });   

    //null !0 =1 , !1=0
   if(!getspecifiedbook) 
       return res.json ({  error : `No book found for the ISBN for  ${req.params.isbn}`});
    else 
      return res.json({ book : getspecifiedbook} ) ;
})

/*
 ROuter     :       /c
Dsescription:      To get specific books based on category 
Access      :       PUBLIC
Parameters  :        category 
Method      :        GET
 */ 
 booky.get ("/c/:category" , async (req , res) => { 
     
    const getspecifiedbook = await bookModel.findOne({category: req.params.category });   
    if( {$IsArray :  [getspecifiedbook]}) 
        return res.json ({  error : `No book found for the category  ${req.params.category}` });
     else 
       return res.json({ book : getspecifiedbook} ) ;;
 }) ;

 /*
 ROuter     :       /lang
Dsescription:      To get specific books based on language  
Access      :       PUBLIC
Parameters  :        language 
Method      :        GET
 */ 

booky.get( "/lang/:language" , async (req ,res) => {

     const getspecifiedbook = await bookModel.findOne({language: req.params.language });   
    if(!getspecifiedbook) 
        return res.json ({  error : `No book found for the Language  ${req.params.language}`});
     else 
       return res.json({ book : getspecifiedbook} ) ;;
 }) ;




 /*
 ROuter     :       /author
Dsescription:      To get all the Authors
Access      :       PUBLIC
Parameters  :        None
Method      :        GET 
 */

booky.get( "/author" , async (req ,res) => {
    const getAllauthor = await authorModel.find();
    return res.json( getAllauthor );
});

 /*
 ROuter     :       /author/authorid
Dsescription:      To get Author based on ID
Access      :       PUBLIC
Parameters  :      id
Method      :        GET 
 */  

booky.get( "/author/authorid/:id" , async (req ,res) => {
      
    const  getAuthor = await authorModel.findOne({id : req.params.id});
        
   if(!getAuthor) 
       return res.json ({  error : `No AUthor found for the ID   ${req.params.id}`});
    else 
      return res.json({ Authors : getAuthor} ) ;
})

 /*
 ROuter     :       /author/book
Dsescription:      To get Author based on ISBN number of book
Access      :       PUBLIC
Parameters  :        id
Method      :        GET 
 */  

booky.get("/author/book/:isbn" , async (req , res)  => 
 {
  const getSpecificAuthor = await authorModel.findOne({books: req.params.isbn});
  //const getSpecificAuthor = await authorModel.find({books : { $eq :req.params.isbn}});

             
   
      if( !getSpecificAuthor) 
          return res.json ({  error : `No Author found for the book of ISBN ${req.params.isbn}`});
    else 
    return res.json({ Authors : getSpecificAuthor} ) ;
 });

  /*
 ROuter     :       /publications
Dsescription:      To get all the Publications
Access      :       PUBLIC
Parameters  :        None
Method      :        GET 
 */

booky.get( "/publications" , async (req ,res) => {
    const getAllpublications = await publicationModel.find();
    return res.json( getAllpublications );
});

 /*
 ROuter     :       /publications/pubid
Dsescription:     To get all the Publication based on the id
Access      :       PUBLIC
Parameters  :      id
Method      :        GET 
 */  

booky.get( "/publications/pubid/:id" ,  async (req ,res) => {
   const getspecifiedpub =  await  publicationModel.findOne( {id : req.params.id})
         
   if(!getspecifiedpub) 
       return res.json ({  error : `No Publication  found for the ID   ${req.params.id}`});
    else 
      return res.json({ publications : getspecifiedpub} ) ;
})

 /*
 ROuter     :       /publications/book
Dsescription:      To get publications based on ISBN number of book
Access      :       PUBLIC
Parameters  :      id
Method      :        GET 
 */  

booky.get("/publications/book/:isbn" , async (req , res)  => 
 {
      const getspecifiedpub =await publicationModel.findOne ({ books : req.params.isbn})
     
     //const getspecifiedpub =  Database.Publications.filter ( (publications )  => publications.books.includes(req.params.isbn) );
      if(!getspecifiedpub) 
          return res.json ({  error : `No Publications found for the book of ISBN ${req.params.isbn}`});
    else 
    return res.json({ Publications : getspecifiedpub} ) ;
 });
 
     // POST request
 
 /*
 ROuter     :       /book/new
Dsescription:      To add New books
Access      :       PUBLIC
Parameters  :       None
Method      :        POST 
 */  

booky.post("/book/new", async (req , res) => {
    
     const { newbook } = req.body;
       const addNewBook = await BookModel.create(newbook);
       //if(addnewBook) 
     //{
     return res.json({ books :addNewBook ,
       message : "inserted succesfully"
    });
     //}
     //else 
       // return res.json({error : `Book of ${newbook.ISBN} is already excits in Database`});


} );


 /*
 ROuter     :       /author/new
Dsescription:      To add New Authors
Access      :       PUBLIC
Parameters  :       None
Method      :        POST 
 */  


booky.post("/author/new", async (req,res) => {
    const { newauthor } = req.body;
    const addNewAuthor = await authorModel.create(newauthor);
    return res.json({ Authors :addNewAuthor,Message : "Author was added" });   
} )


 /*
 ROuter     :       /publications/new
Dsescription:      To add New publications
Access      :       PUBLIC
Parameters  :       None
Method      :        POST 
 

*/  

booky.post("/publications/new", async (req,res) => {
     const{ newpublication} = req.body;
     const addNewPublication = await publicationModel.create(newpublication);
     
     return res.json({Publications :  addNewPublication,Message:"Succesful" });
});



/*******************PUT REQUEST************/


/*
 ROuter     :      /book/update
Dsescription:      Update book on ISBN
Access      :       PUBLIC
Parameters  :       isbn
Method      :        PUT 
 */

booky.put("/book/update/:isbn" , async (req , res) => {
   const updateBook  = await bookModel.findOneAndUpdate(
    {
      ISBN: req.params.isbn
    },
    {
      title : req.body.BookTitle
    },
    {
      new : true
    });
   return res.json({
    Books : updateBook
   }) 
  
} )


/*
 ROuter     :      /book/author/update
Dsescription:      Update /add new author
Access      :       PUBLIC
Parameters  :       isbn
Method      :        PUT 
 */

booky.put("/book/author/update/:isbn", async (req ,res ) => {

  //update Book Database

   const updateBook = await bookModel.findOneAndUpdate (
    {
      ISBN : req.body.isbn
    },
    {
      $addToSet : {
        authors : req.body.newAuthor
      }
    },
    {
      new : true
    }
   );


//update Author Database

const updateAuthor = await authorModel.findOneAndUpdate(
  {
    id : req.body.newAuthor
  },
  {
    $addToSet : {
      books : req.params.isbn
    }
  },
  {
    new : true
  }
);


return res.json({ Books : updateBook ,
  Author : updateAuthor,
messages : "Sucesssss"})

});






/*
 ROuter     :       /publications/update/book
Dsescription:      Update or add New publications
Access      :       PUBLIC
Parameters  :       isbn
Method      :        PUT 
 */ 

booky.put ("/publications/update/book/:isbn", async (req,res) => {
   // Update the publication database


   /*Database.Publications.forEach ((pub) => {
    if(pub.id === req.body.pubID){
       return  pub.books.push(req.params.isbn);
    }

   });*/

   const updatepub = await publicationModel.findOneAndUpdate (
    {
        id : req.body.pubID
     },
     {
      $addToSet : {
        books : req.params.isbn
      }
     }
   )
        //update book database 
 
   /*Database.books.forEach ((book) => {
    if(book.ISBN === parseInt( req.params.isbn)){
        
       return book.publications = req.body.pubID ;
      
    }
})*/

   const updatebook = await bookModel.findOneAndUpdate (
    {
       ISBN : req.params.isbn
    },
    {
      $addToSet : {
        publications : req.body.pubID
      }
    }
   )



   return res.json (
    {
        books : updatebook,
        publications : updatepub,
        message : "Succesfully Updated"
    }
   )

});


   /***************DELETE REQUEST*************** */ 

/*
 ROuter     :      /book/delete/
Dsescription:      To delete a book
Access      :       PUBLIC
Parameters  :       isbn
Method      :        Delete
 */ 

booky.delete ("/book/delete/:isbn" , async (req ,res) => {
 //  const updatedbook = Database.books.filter ((book) => book.ISBN !== req.params.isbn);
   // Database.books = updatedbook
      const updateBook = await bookModel.findOneAndDelete (
        {
          ISBN : req.params.isbn
        }
      );


    return res.json({Books : updateBook});     

});

/*
 ROuter     :      /author/delete/
Dsescription:      To delete a AUTHOR
Access      :       PUBLIC
Parameters  :       id
Method      :        Delete
 */ 

booky.delete ("/author/delete/:id", async (req,res) => {
const updatedauthor = await authorModel.findOneAndDelete ({id : req.params.id})
   // const updatedauthor = Database.author.filter ((author) => author.id !== req.params.id);
     //Database.author = updatedauthor;
    return res.json({Authors : updatedauthor});
}
)

/*
 ROuter     :      /book/delete/author
Dsescription:      Delete an author from book and vice versa
Access      :       PUBLIC
Parameters  :       isbn,authorID
Method      :        Delete
 */ 

  booky.delete("/book/delete/author/:isbn/:authorID" ,async ( req ,res) => {
   //Update the book Database 
      /*   Database.books.forEach((book) => {
         if(book.ISBN === req.params.isbn)
               {
                 const newAUthorList = book.authors.filter ((authorid) => authorid !==  parseInt(req.params.authorID) );
                 book.authors = newAUthorList ;             
               } 
               return ; 
         });*/
         
         const updatedbook = await bookModel.updateOne(
          {
            ISBN : req.params.isbn
          },
           {
            $pull : {
               authors : req.params.authorID
            }
           }
         )
               
        




         //update author
        /* Database.author.forEach((author) => {
       if(author.id === parseInt(req.params.authorID)){
      const newbookList = author.books.filter((bkid) => bkid !== parseInt(req.params.isbn));
        author.books = newbookList ;
        
       }
       return ;
         }); */
         const updatedauthor = await authorModel.updateOne(
          {
            id : req.params.authorID
          },
           {
            $pull : {
               books : req.params.isbn
            }
           }
         )

         return res.json({
         books : updatedbook,
         author : updatedauthor,
        message : "Succesfully Deleted"
   

         })
  })
 


booky.listen(4000 , () => {


    console.log('server is running successfully');
});

 
