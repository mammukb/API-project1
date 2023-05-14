 const books = [
    
  {
    ISBN : "12450book",
    title: "Tesla",
    PubDate : "2021-05-08",
    language : "en",
    numPage : 250,
    authors : [1,2],
    publications : [1],
    category : ["tech","space", "education"]
  },
   {
    ISBN : "1890book",
    title: "Aadujeevitham",
    PubDate : "204-06-10",
    language : "mal",
    numPage : 300,
    authors : [2],
    publications : [1],
    category : ["story","drama", "education"]
   }
   




 ];


 const author = [
      
    {
        id : 1,
        name :"Mammu",
        books : ["12450book", "secrets"]
    },
    {
                id : 2,
                name :"Artist",
                books : ["12450book" ,"1890book"]
    }
 ]

 const Publications = [

    {
      id :1,
      name :"Writex",
      books : ["12450book" , "1890book"]
    },
     {
       id : 2,
       name : "writex", 
       books : []
     }
 ]


 module.exports = { books,author , Publications };