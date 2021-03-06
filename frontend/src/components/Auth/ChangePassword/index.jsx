// React, Router
import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from "react-router-dom";

// Style
import { makeStyles } from '@material-ui/core/styles';

// Core
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

// Server
import axios from 'axios';
import server from '../../../server.json';


const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
    },
    image: {
      backgroundImage: "url(" + process.env.PUBLIC_URL + '/images/main.png' + ")",
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalpaper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright ?? '}
      <span color="inherit">
        Ref:reci
      </span>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const postChangePassword = async (url, userID, userPW) => {
  try {
    const data = await axios({
      method: 'post',
      url: url,
      data: {
          userID: userID,
          userPW: userPW
      },
      headers: {
          accept: 'application/json',
      },
    });
    return data.data;
  }
  catch (err) {
    console.log(url);
    console.log(`ERROR: ${err}`);
  }
}

const postSearchID = async (url, userID) => {
  try {
    const data = await axios({
      method: 'post',
      url: url,
      data: {
          userID: userID,
      },
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

const postEmailAuth = async (url, userID) => {
  try {
    const data = await axios({
      method: 'post',
      url: url,
      data: {
        userID: userID,
      },
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

export default function ChangePassword({history}) {
  const classes = useStyles();

  //form ?????????
  const [userID, setUserID] = useState('');
  const [verification, setVerification] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  
  //?????? 2?????? SIGN UP??? ????????? ????????? ?????? ??????
  const [emailAuth, setEmailAuth] = useState(false);
  const [passwordSame, setPasswordSame] = useState(false);
  
  //???????????? ???????????? ?????????, ????????????
  const [verButtonInactive, setVerButtonInactive] = useState(false);
  //???????????? ????????? ?????????, ????????????
  const [hiddenAuth, setHiddenAuth] = useState(true);
  //SIGN UP ????????? ?????????, ????????????
  const [signUpInactive, setSignUpInactive] = useState(true);

  //???????????? ????????? ????????????
  const [emailAuthData, setEmailAuthData] = useState('');

  // HelperText & ErrorSign
  const [idHelperText, setIdHelperText] = useState('');
  const [verHelperText, setVerHelperText] = useState('');
  const [pwHelperText, setPwHelperText] = useState('');
  const [pwCheckHelperText, setPwCheckHelperText] = useState('');
  const [idError, setIdError] = useState(false);
  const [verError, setVerError] = useState(false);
  const [pwError, setPwError] = useState(false);
  const [pwCheckError, setPwCheckError] = useState(false);

  // Modal 
  const [modalOpen, setModalOpen] = useState(false);
  const modalClose = () => {
    setModalOpen(false);
  };

  useEffect(()=>{
    if(password === passwordCheck && password !== ''){
      setPasswordSame(true);
      setPwCheckHelperText('')
    }
    else{
      setPasswordSame(false);
      if (password && passwordCheck) {
        setPwCheckHelperText('??????????????? ???????????? ????????????.');
        setPwCheckError(true);
      }
    }
  }, [password, passwordCheck])

  useEffect(() => {
    if (emailAuth && passwordSame) {
      setSignUpInactive(false);
    }
    else {
      setSignUpInactive(true);
    }
  }, [emailAuth, passwordSame])

  return (
      <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid item xs={false} sm={6} className={classes.image} />
          <Grid 
            item 
            xs={12} 
            sm={6}
            component={Paper} 
            elevation={6} 
            square
            container
            square
            justifyContent="flex-center"
            alignItems="center"
          >
              <div className={classes.paper}>
                <Typography color="primary" variant="h2" style={{fontFamily:'Munhwajae', fontStyle:'normal', fontWeight:'normal'}}>
                  <b>Ref:Reci</b>
                </Typography>
                <br></br>
                <Typography component="h1" variant="h5">
                  <b>???????????? ??????</b>
                </Typography>
                <form className={classes.form}>
                  <Container maxWidth="md">
                    <Grid container spacing={1} alignItems="center">
                      <Grid item xs={10}>
                        <TextField
                          disabled={verButtonInactive}
                          variant="outlined"
                          required
                          fullWidth
                          id="email"
                          helperText={idHelperText}
                          error={idError}
                          margin="normal"
                          autoFocus
                          label="?????????(E-mail)"
                          name="email"
                          autoComplete="email"
                          onChange={(event) => {
                              setUserID(event.target.value);
                              setIdHelperText('');
                              setIdError(false);
                          }}
                        />
                      </Grid>
                      <Grid item xs={2}>
                            <Button
                              disabled={verButtonInactive}
                              fullWidth
                              size="large"
                              onClick={async () => {
                                const data = await postSearchID(`${server.ip}/user/searchID`, userID);

                                if (data.value === 'Success') {
                                  setIdHelperText('???????????? ?????? ??????????????????.');
                                  setIdError(true);
                                }
                                else if (data.value === 'Duplicate Email'){
                                  const emailDatas = await postEmailAuth(`${server.ip}/user/emailAuth`, userID);
                                  if (emailDatas.value === 'Email Sent') {
                                    setIdHelperText('???????????? ?????????????????????.');
                                    setHiddenAuth(false);
                                    setEmailAuthData(emailDatas.number);
                                    setVerButtonInactive(true);
                                  }
                                  else if (emailDatas.value === 'Email Error') {
                                    setIdHelperText('???????????? ???????????? ???????????????. ?????? ?????? ????????? ???????????????.');
                                    setIdError(true);
                                  }
                                }
                                else if(data.value === 'Wrong Email'){
                                  setIdHelperText('????????? ????????? ?????????????????????.');
                                  setIdError(true);
                                }
                              }}
                            >
                            ??????
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item xs={10}>
                        <TextField
                          disabled={hiddenAuth}
                          variant="outlined"
                          required
                          fullWidth
                          margin="normal"
                          id="verification"
                          label="????????????"
                          name="verification"
                          autoComplete="verification"
                          helperText={verHelperText}
                          error={verError}
                          onChange={(event) => {
                              setVerification(event.target.value);
                              setVerHelperText('');
                              setVerError(false);
                          }}
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <Button
                          color="primary"
                          disabled={hiddenAuth}
                          fullWidth
                          size="large"
                          onClick={async () => {
                            if(verification == emailAuthData) {
                                setEmailAuth(true);
                                setHiddenAuth(true);
                                setVerHelperText('??????????????? ???????????????.')
                            } 
                            else {
                                setEmailAuth(false);
                                setVerHelperText('????????? ?????????????????????.')
                                setVerError(true);
                            }
                          }}
                        >
                        ??????
                        </Button>
                      </Grid>
                    </Grid>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      margin="normal"
                      name="password"
                      label="????????????"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      helperText={pwHelperText}
                      error={pwError}
                      onChange={(event) => {
                          setPassword(event.target.value);
                          if (event.target.value.length < 8) {
                            setPwHelperText('??????????????? 8??? ?????? 20??? ????????? ??????????????????')
                            setPwError(true);
                          } else if (event.target.value.length > 20) {
                            setPwHelperText('??????????????? 8??? ?????? 20??? ????????? ??????????????????')
                            setPwError(true);
                            event.target.value = event.target.value.slice(0, -1);
                          } else {
                            setPwError(false);
                            setPwHelperText('');
                          }
                      }}
                    />
                    <TextField
                      variant="outlined"
                      required
                      margin="normal"
                      fullWidth
                      name="passwordcheck"
                      label="??????????????????"
                      type="password"
                      id="passwordcheck"
                      autoComplete="current-password-check"
                      helperText={pwCheckHelperText}
                      error={pwCheckError}
                      onChange={(event) => {
                        setPasswordCheck(event.target.value);
                        setPwCheckHelperText('');
                        setPwCheckError(false);
                      }}
                    />
                    <Button
                      disabled={signUpInactive}
                      fullWidth
                      variant="contained"
                      color="primary"
                      size="large"
                      className={classes.submit}
                      onClick={async () => {
                          const data = await postChangePassword(`${server.ip}/user/changePassword`, userID, password);

                          if(data.value === 'Success'){
                              history.push("/signin");
                          }
                          else {
                            setModalOpen(true);
                          }
                      }}
                    >
                      ???????????? ??????
                    </Button>
                    <Modal
                      aria-labelledby="transition-modal-title"
                      aria-describedby="transition-modal-description"
                      className={classes.modal}
                      open={modalOpen}
                      onClose={modalClose}
                      closeAfterTransition
                      BackdropComponent={Backdrop}
                      BackdropProps={{
                        timeout: 500,
                      }}
                    >
                      <Fade in={modalOpen}>
                        <div className={classes.modalpaper}>
                          <h2 id="transition-modal-title">???????????????.</h2>
                          <p id="transition-modal-description">????????? ??????????????????. ?????? ??????????????????.</p>
                        </div>
                      </Fade>
                    </Modal>
                    <Grid container justifyContent="flex-end">
                      <Grid item>
                        <Link component={RouterLink} to="/signin" variant="body2">
                          ????????? ???????????? ????????????
                        </Link>
                      </Grid>
                    </Grid>
                    <Box mt={5}>
                          <Copyright />
                      </Box>
                  </Container>
                  </form>
              </div>
          </Grid>
      </Grid>
  );
}