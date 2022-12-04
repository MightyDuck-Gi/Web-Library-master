import { Button, FormLabel, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/*//==================================================\\
    function to allow books to be added to db
*/
const AddBook = () => {
    const history = useNavigate();//useState inorder to redierect users
    const [inputs, setInputs] = useState({//usestate to handle data being loaded
       name: "",
       author: "",
       description: "",
       price: "",
   });

   const handleChange = (e) => {//this handles the changes in to the books
       setInputs((prevState) => ({
           ...prevState,
          [e.target.name]: e.target.value
       }));
   };

   const sendRequest = async() => {//an async function to call the add book function from the backend
    const token = localStorage.getItem("token");
    const userId = token ? jwtDecode(localStorage.getItem("token"))?.user : "";

       await axios.post("http://localhost:5000/books", {
            name: String(inputs.name),
            author: String(inputs.author),
            description: String(inputs.description),
            price: Number(inputs.price),
            createdBy: String(userId),
       }).then(res => res.data);//this then puts the data from the user into
   }

   const handleSubmit = (e) => { //upon press the submit request button, it will send the data to backend and redirect the user to main page
       e.preventDefault();
       sendRequest().then(()=> history("/books"));
   }
//this is the form that the user will use to add thier data to the database
    return <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" justifyContent={"center"} maxWidth={700} alignContent="center" alignSelf= "center" marginLeft="auto" marginRight="auto" marginTop={10}>
            <FormLabel>Name</FormLabel>
            <TextField required={true} value={inputs.name} onChange={handleChange} margin="normal" fullWidth variant="outlined" name="name"/>

            <FormLabel>Author</FormLabel>
            <TextField required={true} value={inputs.author} onChange={handleChange} margin="normal" fullWidth variant="outlined" name="author"/>

            <FormLabel>Description</FormLabel>
            <TextField required={true} value={inputs.description} onChange={handleChange} margin="normal" fullWidth variant="outlined" name="description"/>

            <FormLabel>Price</FormLabel>
            <TextField required={true} value={inputs.price} onChange={handleChange} type="number" margin="normal" fullWidth variant="outlined" name="price"/>

            <Button variant="contained" type="submit" color="success">Request Book</Button>

        </Box>
    </form>
};

export default AddBook