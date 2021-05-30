import React, { useEffect, useState } from 'react';
import {
  Button, Container, CssBaseline, makeStyles, TextField,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import loginAsyncAction from '../store/asyncActions/login';
import useTypedSelector from '../hooks/useTypedSelector';
import { CurrentPage, pageAction } from '../store/pageReducer';
import { clearErrorAction } from '../store/errorReducer';
import ErrorCard from '../components/ErrorCard';

const useStyles = makeStyles((theme) => ({
  paper: {
    height: '100%',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const token = useTypedSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      dispatch(pageAction(CurrentPage.MAIN));
    }
  }, [token]);

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    dispatch(loginAsyncAction(login, password));
    dispatch(clearErrorAction());
  }

  function submitIsDisable() {
    return login.length < 1 || password.length < 6;
  }

  return (
    <Container maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <TextField
            fullWidth
            value={login}
            margin="normal"
            type="text"
            placeholder="Login"
            variant="outlined"
            onChange={(event) => setLogin(event.target.value)}
          />
          <TextField
            fullWidth
            value={password}
            type="password"
            margin="normal"
            variant="outlined"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button fullWidth disabled={submitIsDisable()} type="submit" color="primary">Login</Button>
        </form>
        <ErrorCard />
      </div>
    </Container>
  );
};

export default Login;
