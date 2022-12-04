import React, { useEffect, useState } from 'react'
import axios from 'axios';
import GetBooks from './GetBooks'
/*//==================================================\\
  This is the front-end page for fetching and displaying 
*/
const URL = "http://localhost:5000/approve";
//this will get the router to approve books, 
const fetchHandler = () => {//then it will respound with that data as res
  return axios.get(URL).then((res) => res.data);
};

const ApproveBook = () => {//useState to load the and update the books on the page
  const [books, setBooks] = useState();
  useEffect(() => {
    fetchHandler().then(data => setBooks(data.books));
  }, []);
/*//==================================================\\
    after it has got the data, it will use .map() to 
      loop through and add the data 
*/
    return (
      <div>
        <ul>
          {books && books.map((book, i) => (
            <li key={i}>
              <GetBooks book={book} />
            </li>
          ))}
        </ul>
      </div>
    );
}

export default ApproveBook;