import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from "@mui/material";

/*//==================================================\\
    Handles all the book from user 
*/
const Profiles = () => {

  const [userBooks, setUserBooks] = useState();
  useEffect(() => {//calls the function
    axios.get("http://localhost:5000/auth/profile").then(res => setUserBooks(res.data.books));
  }, []);
  //then it renders the user book collection to the front end table
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{'.MuiTableCell-root': {fontWeight: 'bold'}}}>
            <TableCell>Book Name</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {userBooks && userBooks.map((row) => (
            <TableRow key = {row.name}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.author} </TableCell>
              <TableCell>{row.description} </TableCell>
              <TableCell>{row.price} </TableCell>
              <TableCell>{row.status} </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Profiles;