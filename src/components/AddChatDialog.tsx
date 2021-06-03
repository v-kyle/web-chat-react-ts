import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch } from 'react-redux';
import { createChat } from '../api/chat';
import { setChatAction } from '../store/currentChatReducer';

const AddChatDialog: React.FC<{ handleCloseDialog: () => void, onChatAdd: (
  chatName: string) => void }> = (
    { handleCloseDialog, onChatAdd },
  ) => {
    const [open, setOpen] = useState(true);
    const [chatName, setChatName] = useState('');
    const dispatch = useDispatch();

    async function handleCreateChat() {
      await createChat(chatName);
      handleCloseDialog();
      setOpen(false);
      onChatAdd(chatName);
      dispatch(setChatAction(chatName));
    }

    const handleClose = () => {
      handleCloseDialog();
      setOpen(false);
    };

    return (
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Join chat</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the name of the chat to join it
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            value={chatName}
            onChange={(e) => setChatName(e.target.value)}
            label="Chat name"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreateChat} color="primary" disabled={chatName.length === 0}>
            Join chat
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

export default AddChatDialog;
