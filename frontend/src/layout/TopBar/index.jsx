import {useState, React} from 'react';

// Core
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

// Server
import axios from 'axios';
import server from '../../server.json';

// Style
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import createTheme from '@material-ui/core/styles/createTheme';

// NavLink
import {NavLink} from "react-router-dom";

// Theme -------------------------------------
const mytheme = createTheme({
  palette: {
      primary: {
          light: '#f2da9e',
          main: '#f9bc15',
          dark: '#f19920',
          contrastText: '#fff',
      },
      secondary: {
          light: '#f2ede7',
          main: '#a29d97',
          dark: '#45423c',
          contrastText: '#fff',
      },
      success: {
          light: '#f2ede7',
          main: '#fee500',
          dark: '#45423c',
          contrastText: '#191600',
      },
      info: {
        //light: '#ffffff',
        main: '#ffffff',
        //dark: '#45423c',
      }
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  bar: {
    position: 'fixed',
    top: theme.spacing(2),
    right: theme.spacing(2),
  },
  toolbar: {
    display: 'flex',
    justifyContent:  'space-between',
  },
  logo: {
    cursor: 'pointer'
  }
}));
// -------------------------------------------

const getLogout = async (url) => {
  try {
    const data = await axios({
      method: 'get',
      url: url,
      withCredentials: true,
      headers: {
        accept: 'application/json',
      },
    });
    return data.data;
  }
  catch (err) {
    console.log(`ERROR: ${err}`);
  }
}

export default function TopBar() {
  const classes = useStyles();

  return (
    <div>
      <ThemeProvider theme={mytheme}>
      <div className={classes.root} >
        <AppBar position="static" color="info">
          <Toolbar className={classes.toolbar}>
          <NavLink to={"/"}>
            <img width={150} src={process.env.PUBLIC_URL + '/logo_kr.png'} className={classes.logo} />
            </NavLink>
            <Button 
            color="inherit" 
            onClick={async () => {
              const data = await getLogout(`${server.ip}/user/logout`);
              window.location.href = "http://i5a203.p.ssafy.io/signin"
            }} className={classes.logout} className={classes.logout}>
              로그아웃
            </Button>
          </Toolbar>
        </AppBar>
      </div>
      </ThemeProvider>
    </div>
  )
}




