import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SideDrawer from '../components/SideDrawer';
import useTypedSelector from '../hooks/useTypedSelector';
import { CurrentPage, pageAction } from '../store/pageReducer';
import { getAllChats } from '../api/chat';

const ChatPage: React.FC = () => {
  const dispatch = useDispatch();
  const token = useTypedSelector((state) => state.auth.token);
  // const photo = useTypedSelector((state) => state.auth.user?.photo);

  useEffect(() => {
    if (!token) {
      dispatch(pageAction(CurrentPage.LOGIN));
    }
  }, [token]);

  useEffect(() => {
    async function getChats() {
      const chats = await getAllChats();
      console.log(chats);
    }

    getChats();
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <SideDrawer />
      <main style={{ flexGrow: 1 }}>
        {/* It is chat with your friend
        <img src={photo} alt="" style={{ maxWidth: '400px' }} /> */}
      </main>
    </div>
  );
};

export default ChatPage;
