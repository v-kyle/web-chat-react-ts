import React, { useState } from 'react';
import {
  Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, makeStyles, useMediaQuery,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AddChatDialog from './AddChatDialog';
import UserProfileModal from './UserProfileModal';
import useTypedSelector from '../hooks/useTypedSelector';

const useStyles = makeStyles(() => ({
  drawer: {
    flexShrink: 0,
  },
  drawerListContainer: {
    overflow: 'auto',
  },
}));

const SideDrawer: React.FC<{onChatAdd: (chatName: string) => void}> = ({ onChatAdd }) => {
  const matches = useMediaQuery('(max-width: 500px)');
  const classes = useStyles();
  const user = useTypedSelector((state) => state.auth.user);

  const [showDialog, setShowDialog] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  function handleCloseUserProfile() {
    setShowProfile(false);
  }

  function handleCloseDialog() {
    setShowDialog(false);
  }

  async function handleAddChat(): Promise<void> {
    setShowDialog(true);
  }

  function handleOpenProfile(): void {
    setShowProfile(true);
  }

  return (
    <Drawer
      variant="permanent"
      className={classes.drawer}
      style={{ width: matches ? '56px' : '200px' }}
    >
      <Toolbar />
      <div
        className={classes.drawerListContainer}
        style={{ width: matches ? '56px' : '200px', flexGrow: 1 }}
      >
        <List>
          <ListItem button onClick={handleAddChat}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText>Add chat</ListItemText>
          </ListItem>
          <ListItem button onClick={handleOpenProfile}>
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText>My profile</ListItemText>
          </ListItem>
        </List>
      </div>
      {showDialog ? <AddChatDialog handleCloseDialog={handleCloseDialog} onChatAdd={onChatAdd} /> : ''}
      {showProfile ? <UserProfileModal handleCloseDialog={handleCloseUserProfile} user={user} /> : ''}
    </Drawer>
  );
};
export default SideDrawer;
