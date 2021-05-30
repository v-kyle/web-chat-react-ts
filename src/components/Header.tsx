import React from 'react';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../store/authReducer';
import useTypedSelector from '../hooks/useTypedSelector';
import { CurrentPage, pageAction } from '../store/pageReducer';

const styles = {
  width: '100%',
  background: 'yellow',
};

const Header: React.FC = () => {
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
    <div style={styles}>
      Header
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
      ) : '' }
      {currentPage === CurrentPage.REG ? (
        <Button
          color="primary"
          variant="outlined"
          onClick={setLoginPage}
        >
          Login
        </Button>
      ) : '' }
    </div>
  );
};

export default Header;
