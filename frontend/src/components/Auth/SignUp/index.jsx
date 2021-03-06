// React, Router
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Link as RouterLink } from "react-router-dom";

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
		alignItems: 'center'
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
		alignItems: 'center',
		[theme.breakpoints.down('sm')]: {
			justifyContent: 'center'
		},
		[theme.breakpoints.up('md')]: {
			justifyContent: 'flex-start'
		},
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
	mdbutton: {
		display: 'flex',
		justifyContent: 'center',
	}
}));


const postRegister = async (url, userName, userID, userPW) => {
	try {
		const data = await axios({
			method: 'post',
			url: url,
			data: {
					userName: userName,
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

const postLogin = async (url, userID, userPW) => {
	try {
		const data = await axios({
			method: 'post',
			url: url,
			data: {
					userID: userID,
					userPW: userPW
			},
			withCredentials: true,
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

export default function SignUpSide({history}) {
	const classes = useStyles();

	//form ?????????
	const [userName, setUserName] = useState('');
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
	const [uNameHelperText, setUNameHelperText] = useState('');
	const [idHelperText, setIdHelperText] = useState('');
	const [verHelperText, setVerHelperText] = useState('');
	const [pwHelperText, setPwHelperText] = useState('');
	const [pwCheckHelperText, setPwCheckHelperText] = useState('');
	const [uNameError, setUNameError] = useState(false);
	const [idError, setIdError] = useState(false);
	const [verError, setVerError] = useState(false);
	const [pwError, setPwError] = useState(false);
	const [pwCheckError, setPwCheckError] = useState(false);

	// Modal 
	const [modalOpen, setModalOpen] = useState(false);
	const modalClose = () => {
		setModalOpen(false);
	};
	const [modalTitle, setModalTitle] = useState('');
	const [modalMessage, setModalMessage] = useState('');

	useEffect(()=>{
		if(password === passwordCheck && password !== ''){
			setPasswordSame(true);
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
						alignItems="center"
					>
						<div className={classes.paper}>
							<Typography color="primary" variant="h2" style={{fontFamily:'Munhwajae', fontStyle:'normal', fontWeight:'nomal'}} ><b>Ref:Reci</b></Typography>
							<br></br>
							<Typography component="h1" variant="h5" style={{fontWeight:'Bold'}}>????????????</Typography>
							<form className={classes.form}>
								<Container maxWidth="md">
									<TextField
										name="userName"
										variant="outlined"
										margin="normal"
										required
										fullWidth
										autoComplete="fName"
										autoFocus
										id="userName"
										label="?????????"
										helperText={uNameHelperText}
										error={uNameError}
										onChange={(event) => {
											setUserName(event.target.value);
											if (event.target.value.length < 2) {
												setUNameHelperText('???????????? 2??? ?????? 20??? ????????? ??????????????????.');
												setUNameError(true);
											} else if (event.target.value.length > 20) {
												setUNameHelperText('???????????? 2??? ?????? 20??? ????????? ??????????????????.');
												setUNameError(true);
												event.target.value = event.target.value.slice(0, -1);
											} else {
												setUNameHelperText('');
												setUNameError(false);
											}
										}}
									/>
									<Grid container spacing={2} alignItems="center">
											<Grid item xs={10}>
													<TextField
													disabled={verButtonInactive}
													variant="outlined"
													margin="normal"
													required
													fullWidth
													id="email"
													label="?????????(E-mail)"
													name="email"
													autoComplete="email"
													helperText={idHelperText}
													error={idError}
													onChange={(event) => {
															setUserID(event.target.value);
															setEmailAuth(false);
															setIdHelperText('');
															setIdError(false);
													}}
													/>
											</Grid>
											<Grid item xs={2}>
													<Button
													disabled={verButtonInactive}
													fullWidth
													color="primary"
													required
													size="large"
													onClick={async () => {
															const userDatas = await postSearchID(`${server.ip}/user/searchID`, userID);
															if (userDatas.value === 'Success') {
																	const emailDatas = await postEmailAuth(`${server.ip}/user/emailAuth`, userID);
																	if (emailDatas.value === 'Email Sent') {
																			setIdHelperText('???????????? ?????????????????????.');
																			setHiddenAuth(false);
																			setEmailAuthData(emailDatas.number);
																			setVerButtonInactive(true);
																	}
																	else if(emailDatas.value === 'Email Error') {
																			setIdHelperText('???????????? ???????????? ???????????????. ?????? ????????? ?????????.');
																			setIdError(true);
																	}
															}
															else if (userDatas.value === 'Duplicate Email'){
																	setIdHelperText('?????? ????????? ???????????????.');
																	setIdError(true);
															}
															else if(userDatas.value === 'Wrong Email'){
																	setIdHelperText('????????? ????????? ?????????????????????.');
																	setIdError(true);
															}
													}}
													>
													??????
													</Button>
											</Grid>
									</Grid>
									<Grid container spacing={2} alignItems="center">
										<Grid item xs={10}>
											<TextField
											disabled={hiddenAuth}
											variant="outlined"
											required
											fullWidth
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
													if(verification == emailAuthData){
															setVerHelperText('??????????????? ???????????????.');
															setEmailAuth(true);
															setHiddenAuth(true);
													}
													else{
															setVerHelperText('????????? ?????????????????????.');
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
										margin="normal"
										required
										fullWidth
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
													setPwHelperText('??????????????? 8??? ?????? 20??? ????????? ??????????????????');
													setPwError(true);
												}
												else if (event.target.value.length > 20) {
														setPwHelperText('??????????????? 8??? ?????? 20??? ????????? ??????????????????');
														setPwError(true);
														event.target.value = event.target.value.slice(0, -1);
												} else {
													setPwHelperText('');
													setPwError(false);
												}
										}}
									/>
									<TextField
										variant="outlined"
										margin="normal"
										required
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
										size="large"
										color="primary"
										className={classes.submit}
										onClick={async () => {
											const userDatas = await postRegister(`${server.ip}/user/register`, userName, userID, password);

											if(userDatas.value === 'Success'){
													const userDatas = await postLogin(`${server.ip}/user/login`, userID, password);
													setModalTitle('???????????????.')
													setModalMessage('??????????????? ?????????????????????. ??????????????? ????????? ????????? ????????????.');
													setModalOpen(true);
											}
											else {
												setModalTitle('???????????????.')
												setModalMessage('????????? ??????????????????. ??????????????? ?????? ????????? ?????????.');
											}
										}}
									>
										????????????
									</Button>
									<Modal
										aria-labelledby="transition-modal-title"
										aria-describedby="transition-modal-description"
										className={classes.modal}
										open={modalOpen}
										onClose={modalClose}
										disableBackdropClick
									>
										<Fade in={modalOpen}>
											<div className={classes.modalpaper}>
												<h2 id="transition-modal-title">{modalTitle}</h2>
												<p id="transition-modal-description">{modalMessage}</p>
												<div className={classes.mdbutton}>
													<Button
													onClick={() => {
														history.push("/");
													}}
													>??????</Button>
												</div>
											</div>
										</Fade>
									</Modal>
									<Grid container justifyContent="flex-end">
										<Grid item>
											<Link component={RouterLink} to="/signin" color="secondary" variant="body2">
												?????? ????????? ???????????????? ????????? ?????? ??????
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
