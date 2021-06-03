import React from 'react';
import { useDispatch } from 'react-redux';
import { Backdrop, CircularProgress, makeStyles } from '@material-ui/core';
import Login from './Login';
import useTypedSelector from '../hooks/useTypedSelector';
import { CurrentPage, pageAction } from '../store/pageReducer';
import Registration from './Registration';
import MainPage from './MainPage';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const PageContainer: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentPage = useTypedSelector((state) => state.page.page);
  const token = useTypedSelector((state) => state.auth.token);
  const showBackdrop = useTypedSelector((state) => state.backdrop);

  if (token) {
    dispatch(pageAction(CurrentPage.MAIN));
  } else if (currentPage === CurrentPage.MAIN) {
    dispatch(pageAction(CurrentPage.LOGIN));
  }

  return (
    <>
      {currentPage === CurrentPage.LOGIN && <Login />}
      {currentPage === CurrentPage.REG && <Registration />}
      {currentPage === CurrentPage.MAIN && <MainPage />}
      <Backdrop open={showBackdrop} className={classes.backdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default PageContainer;
