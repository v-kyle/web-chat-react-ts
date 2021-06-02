import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import SideDrawer from '../components/SideDrawer';
import useTypedSelector from '../hooks/useTypedSelector';
import { CurrentPage, pageAction } from '../store/pageReducer';
import { getAllChats, getChat } from '../api/chat';
import Chats from '../components/Chats';
import { Chat } from '../models/Chat';
import SelectedChat from '../components/SelectedChat';
import config from '../config';

const useStyles = makeStyles(() => ({
  mainPageContainer: {
    display: 'flex',
  },
  chatContainer: {
    flexGrow: 1,
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
  },
}));

const MainPage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const token = useTypedSelector((state) => state.auth.token);
  const [chats, setChats] = useState([] as Array<string>);
  const [selectedChatName, setSelectedChatName] = useState('');
  const [selectedChat, setSelectedChat] = useState(null as Chat | null);
  // const photo = useTypedSelector((state) => state.auth.user?.photo);

  useEffect(() => {
    if (!token) {
      dispatch(pageAction(CurrentPage.LOGIN));
    }
  }, [token]);

  useEffect(() => {
    async function getChats() {
      const res = await getAllChats();
      setChats(res.chats);
    }

    const intervalId = setInterval(async () => {
      await getChats();
    }, config.chatsUpdateRate);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    async function getSelectedChat() {
      if (selectedChatName) {
        const res = await getChat(selectedChatName);
        setSelectedChat(res.chat);
      }
    }

    const intervalId = setInterval(async () => {
      await getSelectedChat();
    }, config.selectedChatUpdateRate);

    return () => {
      clearInterval(intervalId);
    };
  }, [selectedChatName]);

  return (
    <div className={classes.mainPageContainer}>
      <SideDrawer />
      <main className={classes.chatContainer}>
        {/* <img src={photo} alt="" style={{ maxWidth: '400px' }} /> */}
        <div style={{ flexGrow: 1, borderRight: '1px solid navy' }}>
          <Chats chats={chats} handleChatNameSelect={setSelectedChatName} />
        </div>
        <SelectedChat chat={selectedChat} />
      </main>
    </div>
  );
};

export default MainPage;
