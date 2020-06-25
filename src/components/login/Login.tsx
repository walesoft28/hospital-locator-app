import React, { useState, ChangeEvent } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LoginBar from './LoginBar';
import firebase from '../config/firebase-config';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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

function Login() {
  const classes = useStyles();

  const [email, setEmail] = useState<any>('')
  const [password, setPassword] = useState<any>('');

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value); 
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value); 
  }

  const login = (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      console.log('changing....')
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(u => console.log(u))
        .catch(error => console.log(error));
  }

  const signup = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    console.log('changing....')
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(u => console.log(u))
      .catch(error => console.log(error));
}

  return (
    <div>
        <LoginBar /> 
        <Container component="main" maxWidth="xs">
        <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={handleEmailChange}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={handlePasswordChange}
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="outlined"
            color="primary"
            className={classes.submit}
            onClick={login}
          >
            Sign In
          </Button>
          <Typography component="h1" variant="h5" style={{textAlign: 'center'}}>
             OR
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={signup}
          >
            Sign Up
          </Button>
        </form>
      </div>
    </Container>
    </div>    
    
  );
}

export default Login;