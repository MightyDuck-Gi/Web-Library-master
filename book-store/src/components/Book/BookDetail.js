import { Button, FormLabel, TextField } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const BookDetail = () => {
/*//==================================================\\
This is the front-end page for fetching and displaying 
*/
    const [inputs, setInputs] = useState({});
    const history = useNavigate();
//passes in id as params to determine which book to load
      const id = useParams().id;
      useEffect(() => {
          const fetchHandler = async() => {//calls the backend function
              await axios.get(`http://localhost:5000/books/${id}`).then((res) => res.data).then(data => setInputs(data.book));
        };
        fetchHandler();
      }, [id]);
//functoin to update the books with required feilds and id
      const sendRequest = async() => {
        await axios.put(`http://localhost:5000/books/${id}`, {
            name: String(inputs.name),
            author: String(inputs.author),
            description: String(inputs.description),
            price: Number(inputs.price),
        }).then(res => res.data)
      };
      //function to handle events after changing data
      const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest().then(() => history("/books"));
      };
      //function to handle events after pressing submit button
      const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
           [e.target.name]: e.target.value
        }));
      };
//loads the data from db to the textfeilds and allows employee to edit it
  return <div>
      { inputs && (
          <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" justifyContent={"center"} maxWidth={700} alignContent="center" alignSelf= "center" marginLeft="auto" marginRight="auto" marginTop={10}>
                <FormLabel>Name</FormLabel>
                <TextField value={inputs.name} onChange={handleChange} margin="normal" fullWidth variant="outlined" name="name" required={true}/>

                <FormLabel>Author</FormLabel>
                <TextField  value={inputs.author} onChange={handleChange} margin="normal" fullWidth variant="outlined" name="author" required={true}/>

                <FormLabel>Description</FormLabel>
                <TextField  value={inputs.description} onChange={handleChange} margin="normal" fullWidth variant="outlined" name="description" required={true}/>

                <FormLabel>Price</FormLabel>
                <TextField value={inputs.price} onChange={handleChange} type="number" margin="normal" fullWidth variant="outlined" name="price" required={true}/>

                <Button variant="contained" type="submit" color="success">Update Book</Button>

            </Box>
        </form>
      )};
  </div>;
};

export default BookDetail