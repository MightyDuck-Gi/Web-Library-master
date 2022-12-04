import { Button } from '@mui/material';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./Book.css";
/*//==================================================\\
This is the front-end page for fetching and displaying 
*/
const Book = (props) => {
  //to redirect the user
    const history = useNavigate();
    const {_id, name, author, description, price, } = props.book;
//checking the local storage for cookies to verify the user role
    const token = localStorage.getItem("token");
    const roles = token ? jwtDecode(localStorage.getItem("token"))?.role || false: false;
//the delete functoins which calls from backend
    const deleteHandler = async() => {
      await axios.delete(`http://localhost:5000/books/${_id}`).then(res => res.data).then(() => history("/")).then(() => history("/books"));
  }
//then loadds the books into cards from MUI and if roles is employee they can edit or delete the books
  return <div className='card'>
      <article>By {author} </article>
      <h3> {name} </h3>
      <p> {description} </p>
      <h3>£ {price} </h3>

      {roles === "employee" &&(<Button color="primary" LinkComponent={ Link } to={`/books/${_id}`} sx= { {mt:'auto'} }>Update</Button>)}
      {roles === "employee" &&(<Button color="error"onClick={deleteHandler} sx= { {mt:'auto' } }> Delete</Button>)}
      
    </div>
};

export default Book;