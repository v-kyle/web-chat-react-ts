import React from 'react';
import { Button, Toolbar } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { logoutAction } from '../store/authReducer';
import useTypedSelector from '../hooks/useTypedSelector';
import { CurrentPage, pageAction } from '../store/pageReducer';

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    width: '100%',
    background: 'yellow',
  },
}));

const Header: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentPage = useTypedSelector((state) => state.page.page);

  function handleLogout() {
    dispatch(logoutAction());
  }

  function setRegPage() {
    dispatch(pageAction(CurrentPage.REG));
  }
  function setLoginPage() {
    dispatch(pageAction(CurrentPage.LOGIN));
  }

  return (
    <div className={classes.appBar}>
      <Toolbar>
        {currentPage === CurrentPage.MAIN ? (
          <Button
            color="primary"
            variant="outlined"
            onClick={handleLogout}
          >
            Logout
          </Button>
        ) : ''}
        {currentPage === CurrentPage.LOGIN ? (
          <Button
            color="primary"
            variant="outlined"
            onClick={setRegPage}
          >
            Registration
          </Button>
        ) : ''}
        {currentPage === CurrentPage.REG ? (
          <Button
            color="primary"
            variant="outlined"
            onClick={setLoginPage}
          >
            Login
          </Button>
        ) : ''}
      </Toolbar>
    </div>
  );
};

export default Header;
