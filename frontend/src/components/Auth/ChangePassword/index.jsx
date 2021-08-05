// React, Router
import React, { useEffect, useState } from 'react';
import { Route } from "react-router";
import { BrowserRouter as Router, Link as RouterLink } from "react-router-dom";

// Style
import { makeStyles } from '@material-ui/core/styles';

// Core
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

// Icons 
import Background from '../../../images/main.png';

// Server
import axios from 'axios';
import server from '../../../server.json';
import { Label } from '@material-ui/icons';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Ref:reci
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

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

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: "url(" + Background + ")",
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
}));

export default function ChangePassword({history}) {
    const classes = useStyles();

    //form 데이터
    const [userID, setUserID] = useState('');
    const [verification, setVerification] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    
    //인증번호 입력칸 활성화, 비활성화
    const [hiddenAuth, setHiddenAuth] = useState(true);

    //아래 2개가 SIGN UP을 활성화 시키기 위한 조건
    const [emailAuth, setEmailAuth] = useState(false);
    const [passwordSame, setPasswordSame] = useState(false);
    
    //SIGN UP 버튼을 활성화, 비활성화
    const [signUpInactive, setSignUpInactive] = useState(true);

    //서버에서 받아온 인증번호
    const [emailAuthData, setEmailAuthData] = useState('');

    useEffect(()=>{
        if(password === passwordCheck && password !== ''){
            console.log('비밀번호가 일치함');
            setPasswordSame(true);
        }
        else{
            console.log('비밀번호가 일치하지 않음');
            setPasswordSame(false);
        }
    }, [password, passwordCheck])

    useEffect(() => {
        if (emailAuth && passwordSame) {
            console.log('두개 모두 true');
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
            <Grid item xs={12} sm={6} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        비밀번호 변경
                    </Typography>
                    <form className={classes.form}>
                        <Grid container spacing={2}>
                            <Grid item xs={9}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="아이디(E-mail)"
                                    name="email"
                                    autoComplete="email"
                                    onChange={(event) => {
                                        setUserID(event.target.value);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    fullHeight
                                    onClick={async () => {
                                        
                                        const userDatas = await postSearchID(`${server.ip}/user/searchID`, userID);

                                        if (userDatas.value === 'Success') {
                                            alert('가입되지 않은 이메일입니다.');
                                        }
                                        else if (userDatas.value === 'Duplicate Email'){
                                            console.log('회원 정보 있음');
                                            //이메일 인증 시작
                                            const userDatas = await postEmailAuth(`${server.ip}/user/emailAuth`, userID);
                                            setHiddenAuth(false);
                                            setEmailAuthData(userDatas);
                                            console.log(userDatas);
                                        }
                                        else if(userDatas.value === 'Wrong Email'){
                                            console.log('이메일 형식이 잘못되었습니다.');
                                        }
                                    }}
                                >
                                인증
                                </Button>
                            </Grid>
                            <Grid item xs={9}>
                                <TextField
                                    disabled={hiddenAuth}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="verification"
                                    label="인증번호"
                                    name="verification"
                                    autoComplete="verification"
                                    onChange={(event) => {
                                        setVerification(event.target.value);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Button
                                    variant="outlined"
                                    disabled={hiddenAuth}
                                    fullWidth
                                    onClick={async () => {
                                        if(verification == emailAuthData){
                                            console.log('인증번호 일치');
                                            setEmailAuth(true);
                                        }
                                        else{
                                            alert('인증번호 불일치');
                                            setEmailAuth(false);
                                        }
                                    }}
                                >
                                확인
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="비밀번호"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={(event) => {
                                        setPassword(event.target.value);
                                        if (event.target.value.length > 20) {
                                            alert('비밀번호는 8자 이상 20자 이하로 입력해주세요');
                                            event.target.value = event.target.value.slice(0, -1);
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="passwordcheck"
                                    label="비밀번호확인"
                                    type="password"
                                    id="passwordcheck"
                                    autoComplete="current-password-check"
                                    onChange={(event) => {
                                        setPasswordCheck(event.target.value);
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            //type="submit"
                            disabled={signUpInactive}
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={async () => {
                                //비밀번호 변경하는 post 함수
                                
                                history.push("/signin");
                            }}
                        >
                            비밀번호 변경
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link component={RouterLink} to="/signin" variant="body2">
                                    로그인 화면으로 돌아가기
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}