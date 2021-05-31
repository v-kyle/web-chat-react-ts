import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import SideDrawer from '../components/SideDrawer';
import useTypedSelector from '../hooks/useTypedSelector';
import { CurrentPage, pageAction } from '../store/pageReducer';
import { getAllChats } from '../api/chat';
import Chats from '../components/Chats';

const useStyles = makeStyles(() => ({
  mainPageContainer: {
    display: 'flex',
  },
  chatContainer: {
    flexGrow: 1,
    display: 'flex',
  },
}));

const MainPage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const token = useTypedSelector((state) => state.auth.token);
  const [chats, setChats] = useState([] as Array<string>);
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
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className={classes.mainPageContainer}>
      <SideDrawer />
      <main className={classes.chatContainer}>
        {/* It is chat with your friend
        <img src={photo} alt="" style={{ maxWidth: '400px' }} /> */}
        <div style={{ flexGrow: 1, borderRight: '1px solid navy' }}>
          <Chats chats={chats} />
        </div>
        <div style={{ flexGrow: 2 }}>Dialog there</div>
      </main>
    </div>
  );
};

export default MainPage;
