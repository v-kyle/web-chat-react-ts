import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles, Container } from '@material-ui/core';
import SideDrawer from '../components/SideDrawer';
import useTypedSelector from '../hooks/useTypedSelector';
import { CurrentPage, pageAction } from '../store/pageReducer';
import { getAllChats } from '../api/chat';
import Chats from '../components/Chats';
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

  return (
    <Container maxWidth="xl" className={classes.mainPageContainer}>
      <SideDrawer />
      <main className={classes.chatContainer}>
        <Chats chats={chats} onChatsEdited={setChats} />
        <SelectedChat />
      </main>
    </Container>
  );
};

export default MainPage;
