import React from 'react';
import { useDispatch } from 'react-redux';
import Login from './Login';
import useTypedSelector from '../hooks/useTypedSelector';
import { CurrentPage, pageAction } from '../store/pageReducer';
import Registration from './Registration';
import ChatPage from './ChatPage';

const PageContainer: React.FC = () => {
  const dispatch = useDispatch();
  const currentPage = useTypedSelector((state) => state.page.page);
  const token = useTypedSelector((state) => state.auth.token);

  if (token) {
    dispatch(pageAction(CurrentPage.MAIN));
  } else if (currentPage === CurrentPage.MAIN) {
    dispatch(pageAction(CurrentPage.LOGIN));
  }

  return (
    <>
      {currentPage === CurrentPage.LOGIN && <Login />}
      {currentPage === CurrentPage.REG && <Registration />}
      {currentPage === CurrentPage.MAIN && <ChatPage />}
    </>
  );
};

export default PageContainer;
