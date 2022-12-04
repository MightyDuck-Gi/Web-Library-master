import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Book from '../Book/Book';
import "./Book.css";

/*//==================================================\\
    This components fetches data from db
*/
const URL = "http://localhost:5000/books";
//this then calls the function from the
const fetchHandler = async() => {
    return await axios.get(URL).then((res) => res.data);
};
const Books = () => {
    const [books, setBooks] = useState();
    useEffect(() => {
        
        fetchHandler().then(data => setBooks(data.books));
    }, []);
//this then uses the map function to go through the books data that have been approved
    return (
    <div>
        <ul>
            {books && books.map((book, i) => {
                if(book.status === "Approved"){
                 return (<li key ={i}>
                    <Book book={book} />
                </li>
                )}
                })}
        </ul>
    </div>
    );
};

export default Books;