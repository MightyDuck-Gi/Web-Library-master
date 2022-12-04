import { Box, Typography } from '@mui/material';
import React from 'react'
/*//==================================================\\
   This is a basic home page, where the user will just 
    ask to sign in
*/
const Home = () => {
  return <div>
    <Box display="flex" flexDirection="column" alignItems="center" padding={20} textAlign="center">
      <Typography variant='h2'>
          Welcome to Read Books Online, please sign in.
      </Typography>
    </Box>
  </div>;
}

export default Home;