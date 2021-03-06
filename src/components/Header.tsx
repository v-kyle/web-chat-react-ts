import React from 'react';
import { Button, Toolbar } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import { logoutAction } from '../store/authReducer';
import useTypedSelector from '../hooks/useTypedSelector';
import { CurrentPage, pageAction } from '../store/pageReducer';
import { setChatAction } from '../store/currentChatReducer';

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    width: '100%',
    background: blue[500],
  },
}));

const Header: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentPage = useTypedSelector((state) => state.page.page);
  const userName = useTypedSelector((state) => state.auth.user?.name);

  function handleLogout() {
    dispatch(logoutAction());
    dispatch(setChatAction(''));
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
        <div style={{
          display: 'flex', alignItems: 'center',
        }}
        >
          {userName && <div style={{ color: 'white', fontSize: '1.15rem', marginRight: '25px' }}>{userName}</div>}
          {currentPage === CurrentPage.MAIN ? (
            <Button
              color="primary"
              style={{ background: blue[50] }}
              variant="outlined"
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : ''}
          {currentPage === CurrentPage.LOGIN ? (
            <Button
              color="primary"
              style={{ background: blue[50] }}
              variant="outlined"
              onClick={setRegPage}
            >
              Registration
            </Button>
          ) : ''}
          {currentPage === CurrentPage.REG ? (
            <Button
              color="primary"
              style={{ background: blue[50] }}
              variant="outlined"
              onClick={setLoginPage}
            >
              Login
            </Button>
          ) : ''}
        </div>
      </Toolbar>
    </div>
  );
};

export default Header;
