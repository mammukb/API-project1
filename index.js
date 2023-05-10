const express = require('express');
//Database
      const Database = require("./database");
const e = require('express');

//Initialise
const   booky = express();
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



booky.listen(5000 , () => {
    console.log('server is running successfully');
});


