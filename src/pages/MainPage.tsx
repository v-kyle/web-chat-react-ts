import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles, Container } from '@material-ui/core';
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
  const selectedChatName = useTypedSelector((state) => state.currentChat);
  const token = useTypedSelector((state) => state.auth.token);
  const [chats, setChats] = useState([] as Array<string>);
  const [selectedChat, setSelectedChat] = useState(null as Chat | null);

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

  useLayoutEffect(() => {
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
    <Container maxWidth="xl" className={classes.mainPageContainer}>
      <SideDrawer />
      <main className={classes.chatContainer}>
        <Chats chats={chats} />
        <SelectedChat chat={selectedChat} />
      </main>
    </Container>
  );
};

export default MainPage;
