import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { User } from '../models/User';
import EditProfileDialog from './EditProfileDialog';

const UserProfileModal: React.FC<{user: User | null, handleCloseDialog: () => void}> = (
  { user, handleCloseDialog },
) => {
  const [open, setOpen] = useState(true);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const handleClose = () => {
    handleCloseDialog();
    setOpen(false);
  };

  const handleCloseEditDialog = () => {
    setShowEditDialog(false);
  };

  const handleEditProfile = () => {
    setShowEditDialog(true);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        {user
        && (
        <>
          <DialogTitle id="form-dialog-title">Profile info</DialogTitle>
          <DialogContent>
            Login:
            {user.login}
            <br />
            Name:
            {user.name}
            <br />
            Photo:
            <br />
            <img src={user.photo} alt="" style={{ width: '50%' }} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleEditProfile} color="primary">
              Edit
            </Button>
          </DialogActions>
        </>
        )}
      </Dialog>
      {showEditDialog && <EditProfileDialog onClose={handleCloseEditDialog} /> }
    </div>
  );
};

export default UserProfileModal;
