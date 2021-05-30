import React, { useState } from 'react';
import {
  Container, TextField, Button, CssBaseline, makeStyles,
} from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';
import { useDispatch } from 'react-redux';
import { RegParams } from '../api/auth';
import reg from '../store/asyncActions/reg';

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

const Registration: React.FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [login, setLogin] = useState('');
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState('');
  const [password, setPassword] = useState('');

  function savePhoto(file: File): void {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    let base64: string | ArrayBuffer | null = '';
    reader.onload = () => {
      base64 = reader.result;
      setPhoto(base64 as string);
    };
  }

  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    const regParams: RegParams = {
      login,
      name,
      photo,
      password,
    };

    dispatch(reg(regParams));
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
            value={name}
            margin="normal"
            type="text"
            placeholder="Name"
            variant="outlined"
            onChange={(event) => setName(event.target.value)}
          />
          <DropzoneArea
            acceptedFiles={['image/*']}
            dropzoneText="Drag and drop an image here or click"
            filesLimit={1}
            onChange={(files) => {
              if (files && files[0]) {
                savePhoto(files[0]);
              }
            }}
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
          <Button fullWidth type="submit" color="primary">Register</Button>
        </form>
      </div>
    </Container>
  );
};

export default Registration;
