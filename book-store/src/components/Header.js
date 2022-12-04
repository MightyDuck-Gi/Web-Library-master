import React, { useState } from 'react';
import { AppBar, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import jwtDecode from 'jwt-decode';

const Header = () => {
    const [value, setValue] = useState(0);
    const history = useNavigate();
/*//==================================================\\
    This is check to see if the user is logged in, or what 
      role that user is 
*/
    const token = localStorage.getItem("token");
    const loggedIn = token ? jwtDecode(localStorage.getItem("token"))?.login || false :false;
    const roles = token ? jwtDecode(localStorage.getItem("token"))?.role || false: false;
/*//==================================================\\
    A function to handle loggin out the user
*/
    const logoutHandler = () => {
            localStorage.removeItem("token");    
            history ("/", {replace: true});
    }
/*//==================================================\\
    Then using material ui the nav-bar was made below
*/
  return (<div>
      <AppBar sx= {{ backgroundColor: "#00171F" }} position='sticky'>
          <Toolbar>
            <NavLink to="/" style={{ color: "white" }} >
            <Typography>
                <LibraryBooksIcon/>
            </Typography>
            </NavLink>
            <Tabs 
            sx = {{ ml: "auto" }}
            textColor='inherit' 
            indicatorColor='secondary' 
            value={value} 
            onChange={(e, val) => setValue(val)}
            >
                <Tab LinkComponent={NavLink} to ="/books" label ="Books" />
                {roles === "employee" &&(<Tab LinkComponent={NavLink} to ="/approve" label ="View request" />)}
                {roles === "customer" && (<Tab LinkComponent={NavLink} to ="/add" label ="Request Book" />)}
                {roles === "admin" && (<Tab LinkComponent={NavLink} to ="/users" label ="Users" />)}
                {roles === "customer" && (<Tab LinkComponent={NavLink} to ="/profiles" label ="Profile" />)}
                {loggedIn && (<Tab onClick={logoutHandler} label ="Logout" />)}
                {!loggedIn &&(<Tab LinkComponent={NavLink}  to ="/login" label ="Login" />)}
            </Tabs>
          </Toolbar>
      </AppBar>
  </div>
  )
};

export default Header;