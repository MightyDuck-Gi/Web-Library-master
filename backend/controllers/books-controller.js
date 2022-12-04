const Book = require ("../model/Book");
const User = require ("../model/User");
/*//==================================================\\
        This will get all the books from the databse 
*/
const getAllBooks = async (req, res, next) =>{
    let books;
    try {//get books from the database
        books = await Book.find();
    } catch (err) {//otherwise it will console log out error
        console.log(err);
    }
/*//==================================================\\
       this is a condition to make sure that the 
        backend doesn't crash just incase
        and instead will respond with error
*/
    if (!books) {
        return res.status(404).json({ message:"No book found" });
    }//Then it will send json obj as books
    return res.status(200).json({ books });
};
/*//==================================================\\
    This will get all the book with Id as it its parapmeters 
        from the databse 
*/
const getById = async (req, res, next) => {
    //it will search the book db with id
    const id = req.params.id;
    let book;
    try {
        book = await Book.findById(id);
    } catch (err) {
        console.log(err);
    }
    //once it finds a book with matching id it send as json obj as book
    if (!book) { 
        return res.status(404).json({ message:"No book found" });
    }
    return res.status(200).json({ book });
}
/*//==================================================\\
    This is the api which controlls what books gets 
        saved to the database
*/
const addBook = async (req, res, next) => {//these are the field that are passed from the request 
    const { name, author, description, price, createdBy } = req.body;
    let book; 
    try{//then it will add the books with these field
        book = new Book({
            name, 
            author,
            description,
            price,
            createdBy,//this is a virtual function to assosciate book with users
        });
        await book.save();
    }   catch (err) {
        console.log(err);
    }

    if (!book) {//if there is error adding book to data base it will send a 500 status
        return res.status(500).json({ message:"No Book Found"});
    }
    return res.status(201).json({ book });
    
};
/*//==================================================\\
    This is the api which controlls what books gets updated to the database
*/
const updateBook = async (req, res, next) => {
    const id = req.params.id;//same as before, takes in the id as params
    const { name, author, description, price, status, createdBy } = req.body;//takes feild requested by user 
    let book;
    try {// takes users input and will update the books 
        book = await Book.findByIdAndUpdate(id, {
            name, 
            author,
            description,
            price,
            createdBy,
            status : status ? status:"waiting"//once changed it will need to be approved again just incase
        });
        book = await book.save();
    } catch (err) {//try catch block to prevent any crashes on server
        console.log(err);
    }
    if (!book) {//responds with book other wise 404 status
        return res.status(404).json({ message:"Unavailiable To Update"});
    }
    return res.status(200).json({ book });
}
/*//==================================================\\
    This is the api which deletes the book from database
*/
const deleteBook = async (req, res, next) => {
    const id = req.params.id;//takes id to search which books to be deteled
    let book;
    try {
        book = await Book.findByIdAndRemove(id);//matching id obj will be removed from db
    }  catch (err) {
        console.log(err);
    }
    if (!book) {//will send message to bakcend if iwas successful or not
        return res.status(404).json({ message:"Unavailiable To Delete"});
    }
    return res.status(200).json({ message:"Book Successfully Deleted" });
}
/*//==================================================\\
    These are all the exports for each of the function
*/
exports.addBook = addBook;
exports.getById = getById;
exports.updateBook = updateBook;
exports.deleteBook = deleteBook;
exports.getAllBooks = getAllBooks;