import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useTypedSelector from '../hooks/useTypedSelector';
import { CurrentPage, pageAction } from '../store/pageReducer';

const ChatPage: React.FC = () => {
  const dispatch = useDispatch();
  const token = useTypedSelector((state) => state.auth.token);

  useEffect(() => {
    if (!token) {
      dispatch(pageAction(CurrentPage.LOGIN));
    }
  }, [token]);

  return (
    <div>
      It is chat with your friend
    </div>
  );
};

export default ChatPage;
