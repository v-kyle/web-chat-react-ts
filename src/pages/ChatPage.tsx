import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useTypedSelector from '../hooks/useTypedSelector';
import { CurrentPage, pageAction } from '../store/pageReducer';

const ChatPage: React.FC = () => {
  const dispatch = useDispatch();
  const token = useTypedSelector((state) => state.auth.token);
  const photo = useTypedSelector((state) => state.auth.user?.photo);

  useEffect(() => {
    if (!token) {
      dispatch(pageAction(CurrentPage.LOGIN));
    }
  }, [token]);

  return (
    <div>
      <img src={photo} alt="" style={{ maxWidth: '400px' }} />
      It is chat with your friend
    </div>
  );
};

export default ChatPage;
