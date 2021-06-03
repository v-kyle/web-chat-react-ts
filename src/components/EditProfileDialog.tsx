import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DropzoneArea } from 'material-ui-dropzone';
import { useDispatch } from 'react-redux';
import useTypedSelector from '../hooks/useTypedSelector';
import { editProfile } from '../api/user';
import { setUserAction } from '../store/authReducer';

const EditProfileDialog: React.FC<{onClose: () => void}> = ({ onClose }) => {
  const dispatch = useDispatch();
  const user = useTypedSelector((state) => state.auth.user);
  const [open, setOpen] = React.useState(true);
  const [name, setName] = useState(user?.name);
  const [photo, setPhoto] = useState(user?.photo);

  function savePhoto(file: File): void {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    let base64: string | ArrayBuffer | null = '';
    reader.onload = () => {
      base64 = reader.result;
      setPhoto(base64 as string);
    };
  }

  async function handleEditProfile() {
    const userData = await editProfile({
      name,
      photo,
    });
    dispatch(setUserAction(userData));
    setOpen(false);
    onClose();
  }

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="xl">
        <DialogTitle id="form-dialog-title">Edit Profile</DialogTitle>
        <DialogContent>
          <DialogContentText>
            There you can change your information: name and photo
          </DialogContentText>
          <TextField
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            style={{ marginBottom: '30px' }}
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridGap: '40px' }}>
            <div>
              <div>Your current photo:</div>
              <img src={user?.photo} alt="" style={{ maxWidth: '300px', border: '1px solid grey' }} />
            </div>
            <div>
              <div>New photo:</div>
              <DropzoneArea
                acceptedFiles={['image/*']}
                dropzoneText="Drag and drop an image here or click"
                filesLimit={1}
                onChange={(files) => {
                  if (files && files[0]) {
                    savePhoto(files[0]);
                  } else {
                    setPhoto('');
                  }
                }}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditProfile} disabled={name?.length === 0} color="primary">
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditProfileDialog;
