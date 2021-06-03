import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { User } from '../models/User';
import EditProfileDialog from './EditProfileDialog';
import useTypedSelector from '../hooks/useTypedSelector';

const UserProfileModal: React.FC<{user: User | null, handleCloseDialog: () => void}> = (
  { user, handleCloseDialog },
) => {
  const [open, setOpen] = useState(true);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const authedUserId = useTypedSelector((state) => state.auth.user && state.auth.user.id);

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
            <span style={{ marginRight: '1rem', fontWeight: 'bold' }}>Login:</span>
            {user.login}
            <br />
            <span style={{ marginRight: '1rem', fontWeight: 'bold' }}>Name:</span>
            {user.name}
            <br />
            <br />
            <span style={{ marginRight: '1rem', fontWeight: 'bold' }}>Your photo:</span>
            <br />
            <br />
            <img src={user.photo} alt="" style={{ maxWidth: '400px', border: '1px solid grey' }} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            {(authedUserId === user.id) && (
            <Button onClick={handleEditProfile} color="primary">
              Edit
            </Button>
            )}
          </DialogActions>
        </>
        )}
      </Dialog>
      {showEditDialog && <EditProfileDialog onClose={handleCloseEditDialog} /> }
    </div>
  );
};

export default UserProfileModal;
