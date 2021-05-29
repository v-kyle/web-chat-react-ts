import React, { useState } from 'react';
import {
  Container, TextField, Button, CssBaseline, makeStyles,
} from '@material-ui/core';

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
  const classes = useStyles();

  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');

  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    console.log(login, pass);
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
            value={pass}
            type="password"
            margin="normal"
            variant="outlined"
            placeholder="Password"
            onChange={(event) => setPass(event.target.value)}
          />
          <Button fullWidth type="submit" color="primary">Login</Button>
        </form>
      </div>
    </Container>
  );
};

export default Login;
