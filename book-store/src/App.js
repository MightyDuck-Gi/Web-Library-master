import React from "react";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AddBook from "./components/AddBook";
import Books from "./components/Book/Books";
import BookDetail from "./components/Book/BookDetail";
import Login from "./components/Login";
import Register from "./components/Register";
import Profiles from "./components/Profiles";
import ApproveBook from "./components/Book/ApproveBook";
import Users from "./components/Users";
import axios from "axios";
import jwtDecode from 'jwt-decode';

axios.defaults.withCredentials = true;

function App() {
  /*//==================================================\\
    This is check to see if the user is logged in, or what 
      role that user is 
*/
  const token = localStorage.getItem("token");
  const loggedIn = token ? jwtDecode(localStorage.getItem("token"))?.login || false :false;
  const roles = token ? jwtDecode(localStorage.getItem("token"))?.role || false: false;
  /*//==================================================\\
    Then the routes are protected using these const above
*/
  return <React.Fragment >
    <header>
      <Header />
    </header>
    <main>
    <Routes>
        <Route path ="/" element={<Home />} exact />
        {roles === "customer" && (<Route path ="/add" element={<AddBook />} exact />)}
        {roles === "employee" &&(<Route path ="/approve" element={<ApproveBook />} exact />)}
        {roles === "admin" &&(<Route path ="/users" element={<Users />} exact />)}
        {roles === "customer" &&(<Route path ="/profiles" element={<Profiles />} exact />)}
        {roles === "employee" &&(<Route path ="/books/:id" element={<BookDetail />} exact />)}
        {!loggedIn &&(<Route path ="/register" element={<Register />} exact />)}
        <Route path ="/login" element={<Login />} exact />
        <Route path ="/books" element={<Books />} exact />            
        </Routes>      
    </main> 
  </React.Fragment>
}

export default App;
