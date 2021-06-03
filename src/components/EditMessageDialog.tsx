import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { editMessage } from '../api/chat';
import { Message } from '../models/Message';
import useTypedSelector from '../hooks/useTypedSelector';

const EditMessageDialog: React.FC<{
  onCloseDialog: () => void,
  message: Message,
}> = ({ onCloseDialog, message }) => {
  const [open, setOpen] = useState(true);
  const [text, setText] = useState(message.text);
  const chatName = useTypedSelector((state) => state.currentChat);

  const handleClose = () => {
    setOpen(false);
    onCloseDialog();
  };

  async function handleEditMessage() {
    const data = await editMessage(chatName, message.id, text);
    // const resMessage = data.chat.message[0];
    setOpen(false);
    onCloseDialog();
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth>
        <DialogTitle id="form-dialog-title">EditMessage</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Message"
            placeholder="Message"
            type="text"
            fullWidth
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditMessage} color="primary" disabled={text.length === 0}>
            Edit message
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditMessageDialog;
