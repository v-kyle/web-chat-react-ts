import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  DialogContentText, List, ListItem, ListItemText,
} from '@material-ui/core';
import { User } from '../models/User';
import UserProfileModal from './UserProfileModal';
import { getProfile } from '../api/user';

const UserListDialog: React.FC<{onClose: () => void, users: Array<User> | null}> = (
  { users, onClose },
) => {
  const [open, setOpen] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [userFromServer, setUserFromServer] = useState(null as User | null);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const handleClick = async (id: number) => {
    const data = await getProfile(id);
    setUserFromServer(data);
    setShowProfile(true);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="md">
        <DialogTitle id="form-dialog-title">Chat users list</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Click on user to open profile
          </DialogContentText>
          <List component="div" aria-label="secondary">
            {users && users.map((user) => (
              <ListItem button key={user.id} onClick={() => handleClick(user.id)}>
                <ListItemText primary={user.name} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      {showProfile && (
      <UserProfileModal
        user={userFromServer}
        handleCloseDialog={() => {
          setShowProfile(false);
          setUserFromServer(null);
        }}
      />
      )}
    </div>
  );
};

export default UserListDialog;
