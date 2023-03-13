import * as React from 'react';
import { useState, useEffect } from 'react';
import { auth } from './firebase';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Grid } from '@material-ui/core';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import logo from './logo.jpg';
import LogoutButton from './LogoutButton';
import "../styles.css";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchAppBar() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // check if user is logged in
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsLoggedIn(!!user); // set isLoggedIn to true if user exists, false otherwise
    });

    return unsubscribe;
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <div xs={4}> <img
            src={`${logo}?w=234&h=78&fit=crop&auto=format`}
            srcSet={`${logo}?w=234&h=78&fit=crop&auto=format&dpr=2 2x`}
            alt="SYNERGY"
            loading="lazy"
          /></div> 
          <Search xs={8}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          {!isLoggedIn && (
            <div>
              <a href="/login">Login</a>
              <a href="/signup">Signup</a>
            </div>
          )}
          {isLoggedIn && <>
            <a href="/my-service-request">My Service Requests</a>
          <LogoutButton /></>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}