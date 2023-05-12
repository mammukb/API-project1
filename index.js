const express = require("express");
var bodyparser = require("body-parser");




//Database
      const Database = require("./database");
const { books } = require("./database");


//Initialise
const   booky = express();
booky.use(bodyparser.urlencoded ({extended : true}));
booky.use (bodyparser.json());


 /*
 ROuter     :       /
Dsescription:      To get all the books 
Access      :       PUBLIC
Parameters  :        none
Method      :        GET
 */ 
booky.get( "/" , (req ,res)  => {
    return res.json( {books : Database.books} );
});

 /*
 ROuter     :       /is
Dsescription:      To get specific books based on ISBN 
Access      :       PUBLIC
Parameters  :        isbn 
Method      :        GET
 */ 
booky.get( "/is/:isbn" , (req ,res) => {
    const getspecifiedbook = Database.books.filter( (book )=> book.ISBN === req.params.isbn );       
   if(getspecifiedbook.length === 0) 
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
 booky.get ("/c/:category" , (req , res) => { 
     
      const getspecifiedbook = Database.books.filter( (book) => book.category.includes( req.params.category));

      if(getspecifiedbook.length === 0) 
       return res.json ({  error : `No book found for the ISBN for  ${req.params.category}`});
    else 
      return res.json({ book : getspecifiedbook} ) ;
 }) ;

 /*
 ROuter     :       /lang
Dsescription:      To get specific books based on language  
Access      :       PUBLIC
Parameters  :        language 
Method      :        GET
 */ 

booky.get( "/lang/:language" , (req ,res) => {
    const getspecifiedbook = Database.books.filter( (book )=> book.language === req.params.language );       
   if(getspecifiedbook.length === 0) 
       return res.json ({  error : `No book found for the ISBN for  ${req.params.language}`});
    else 
      return res.json({ book : getspecifiedbook} ) ;
})



 /*
 ROuter     :       /author
Dsescription:      To get all the Authors
Access      :       PUBLIC
Parameters  :        None
Method      :        GET 
 */

booky.get( "/author" , (req ,res) => {
    return res.json( {Authors : Database.author} );
});

 /*
 ROuter     :       /author/authorid
Dsescription:      To get Author based on ID
Access      :       PUBLIC
Parameters  :      id
Method      :        GET 
 */  

booky.get( "/author/authorid/:id" , (req ,res) => {
    const getspecifiedauthor = Database.author.filter( (author )=> author.id ===  parseInt(req.params.id) );       
   if(getspecifiedauthor.length === 0) 
       return res.json ({  error : `No AUthor found for the ID   ${req.params.id}`});
    else 
      return res.json({ Authors : getspecifiedauthor} ) ;
})

 /*
 ROuter     :       /author/book
Dsescription:      To get Author based on ISBN number of boojk
Access      :       PUBLIC
Parameters  :      id
Method      :        GET 
 */  

booky.get("/author/book/:isbn" , (req , res)  => 
 {
     const getspecifiedauthor =  Database.author.filter ( (author )  => author.books.includes(req.params.isbn) );
      if(getspecifiedauthor.length === 0) 
          return res.json ({  error : `No Author found for the book of ISBN ${req.params.isbn}`});
    else 
    return res.json({ Authors : getspecifiedauthor} ) ;
 });

  /*
 ROuter     :       /publications
Dsescription:      To get all the Publications
Access      :       PUBLIC
Parameters  :        None
Method      :        GET 
 */

booky.get( "/publications" , (req ,res) => {
    return res.json( {Publication : Database.Publications} );
});

 /*
 ROuter     :       /publications/pubid
Dsescription:     To get all the Publication based on the id
Access      :       PUBLIC
Parameters  :      id
Method      :        GET 
 */  

booky.get( "/publications/pubid/:id" , (req ,res) => {
    const getspecifiedpub = Database.Publications.filter( (publications )=> publications.id ===  parseInt(req.params.id) );       
   if(getspecifiedpub.length === 0) 
       return res.json ({  error : `No Publication  found for the ID   ${req.params.id}`});
    else 
      return res.json({ publications : getspecifiedpub} ) ;
})

 /*
 ROuter     :       /publications/book
Dsescription:      To get publications based on ISBN number of boojk
Access      :       PUBLIC
Parameters  :      id
Method      :        GET 
 */  

booky.get("/publications/book/:isbn" , (req , res)  => 
 {
     const getspecifiedpub =  Database.Publications.filter ( (publications )  => publications.books.includes(req.params.isbn) );
      if(getspecifiedpub.length === 0) 
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

booky.post("/book/new", (req , res) => {
    
     const newbook = req.body;
       const Checkbook = Database.books.filter((books ) => books.ISBN === newbook.ISBN);
       if(Checkbook.length === 0) 
     {
    Database.books.push(newbook);
     return res.json({updatedBooks :Database.books });
     }
     else 
        return res.json({error : `Book of ${newbook.ISBN} is already excits in Database`});


} );

 /*
 ROuter     :       /author/new
Dsescription:      To add New Authors
Access      :       PUBLIC
Parameters  :       None
Method      :        POST 
 */  

booky.post("/author/new", (req,res) => {
    const newauthor = req.body;
    Database.author.push(newauthor);
    return res.json({updatedAuthors :Database.author });   
} )

 /*
 ROuter     :       /publications/new
Dsescription:      To add New publications
Access      :       PUBLIC
Parameters  :       None
Method      :        POST 
 */  

booky.post("/publications/new", (req,res) => {
     const newpublication = req.body;
     Database.Publications.push(newpublication);
     return res.json({updatedPublications :Database.Publications });
});

/*
 ROuter     :       /publications/update/book
Dsescription:      Update or add New publications
Access      :       PUBLIC
Parameters  :       isbn
Method      :        PUT 
 */ 

booky.put ("/publications/update/book/:isbn", (req,res) => {
   // Update the publication database
   Database.Publications.forEach ((pub) => {
    if(pub.id === req.body.pubID){
       return  pub.books.push(req.params.isbn);
    }

   });


   Database.books.forEach ((book) => {
    if(book.ISBN === parseInt( req.params.isbn)){
        
         return book.publications = req.body.pubID ;
      
    }



})

   return res.json (
    {
        books :Database.books,
        publications : Database.Publications,
        message : "Succesfully Updated"
    }
   )


});

   // DELETE REQUEST

/*
 ROuter     :      /book/delete/
Dsescription:      To delete a book
Access      :       PUBLIC
Parameters  :       isbn
Method      :        Delete
 */ 

booky.delete ("/book/delete/:isbn" ,(req ,res) => {
    const updatedbook = Database.books.filter ((book) => book.ISBN !== req.params.isbn);
    Database.books = updatedbook
    return res.json({updatedBooks : Database.books});     
   

})

/*
 ROuter     :      /author/delete/
Dsescription:      To delete a AUTHOR
Access      :       PUBLIC
Parameters  :       id
Method      :        Delete
 */ 

booky.delete ("/author/delete/:id",(req,res) => {

    const updatedauthor = Database.author.filter ((author) => author.id !== req.params.id);
    Database.author = updatedauthor;
    return res.json({updatedAuthors : Database.author});
}
)

/*
 ROuter     :      /book/delete/author
Dsescription:      Delete an author from book and vice versa
Access      :       PUBLIC
Parameters  :       isbn,authorID
Method      :        Delete
 */ 

  booky.delete("/book/delete/author/:isbn/:authorID" ,(req ,res) => {
   //Update the book Database 
         Database.books.forEach((book) => {
         if(book.ISBN === req.params.isbn)
               {
                 const newAUthorList = book.authors.filter ((authorid) => authorid !==  parseInt(req.params.authorID) );
                 book.authors = newAUthorList ;             
               } 
               return ; 
         });

         //update author
         Database.author.forEach((author) => {
       if(author.id === parseInt(req.params.authorID)){
      const newbookList = author.books.filter((bkid) => bkid !== parseInt(req.params.isbn));
        author.books = newbookList ;
        
       }
       return ;
         });

         return res.json({
         books : Database.books,
         author : Database.author,
        message : "Succesfully Deleted"
   

         })
  })
 
  










booky.listen(4000 , () => {


    console.log('server is running successfully');
});


