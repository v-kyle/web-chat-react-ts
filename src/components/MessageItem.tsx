import React, { useState } from 'react';
import { IconButton, makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Message } from '../models/Message';
import { getProfile } from '../api/user';
import { User } from '../models/User';
import UserProfileModal from './UserProfileModal';
import { closeBackdropAction, openBackdropAction } from '../store/backdropReducer';
import EditMessageDialog from './EditMessageDialog';
import useTypedSelector from '../hooks/useTypedSelector';
import { deleteMessage } from '../api/chat';

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
  messageTime: {
    fontSize: '.8rem',
    background: 'transparent',
    border: 'none',
    fontStyle: 'italic',
  },
}));

const MessageItem: React.FC<{ message: Message }> = ({ message }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const authUser = useTypedSelector((state) => state.auth.user);
  const chatName = useTypedSelector((state) => state.currentChat);
  const isMyMessage = () => message.author.id === authUser?.id;

  const [user, setUser] = useState(null as User | null);
  const [showEditDialog, setShowEditDialog] = useState(false);

  async function handleShowProfile() {
    dispatch(openBackdropAction());
    const data = await getProfile(message.author.id);
    setUser(data);
    dispatch(closeBackdropAction());
  }

  function handleCloseDialog() {
    setUser(null);
  }

  async function handleDeleteMessage() {
    await deleteMessage(chatName, message.id);
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
      <div className={classes.messageTime}>{message.time}</div>
      {isMyMessage() && (
      <IconButton size="small" onClick={() => setShowEditDialog(true)}>
        <EditIcon />
      </IconButton>
      )}
      {isMyMessage() && (
        <IconButton size="small" onClick={handleDeleteMessage}>
          <DeleteIcon />
        </IconButton>
      )}
      {user && <UserProfileModal user={user} handleCloseDialog={handleCloseDialog} />}
      {showEditDialog && (
      <EditMessageDialog
        onCloseDialog={() => setShowEditDialog(false)}
        message={message}
      />
      )}
    </div>
  );
};

export default MessageItem;
