import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { Message } from '../models/Message';
import { getProfile } from '../api/user';
import { User } from '../models/User';
import UserProfileModal from './UserProfileModal';
import { closeBackdropAction, openBackdropAction } from '../store/backdropReducer';

const useStyles = makeStyles(() => ({
  messageItem: {
    background: 'white',
    border: '1px solid grey',
    marginBottom: '25px',
    padding: '5px 10px',
    borderRadius: '20px',
  },
  messageAuthor: {
    fontSize: '.9rem',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontStyle: 'italic',
  },
  messageText: {
    fontSize: '1.15rem',
  },
}));

const MessageItem: React.FC<{ message: Message }> = ({ message }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [user, setUser] = useState(null as User | null);

  async function handleShowProfile() {
    dispatch(openBackdropAction());
    const data = await getProfile(message.author.id);
    setUser(data);
    dispatch(closeBackdropAction());
  }

  function handleCloseDialog() {
    setUser(null);
  }

  return (
    <div className={classes.messageItem}>
      <button className={classes.messageAuthor} onClick={handleShowProfile} type="button">
        From:
        {' '}
        {message.author.name}
      </button>
      <br />
      <div className={classes.messageText}>{message.text}</div>
      <br />
      <div className={classes.messageAuthor}>{message.time}</div>
      {user && <UserProfileModal user={user} handleCloseDialog={handleCloseDialog} />}
    </div>
  );
};

export default MessageItem;
