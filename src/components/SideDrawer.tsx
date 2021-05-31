import React, { useState } from 'react';
import {
  Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, makeStyles, useMediaQuery,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AddChatDialog from './AddChatDialog';

const useStyles = makeStyles(() => ({
  drawer: {
    flexShrink: 0,
  },
  drawerListContainer: {
    overflow: 'auto',
  },
}));

const SideDrawer: React.FC = () => {
  const matches = useMediaQuery('(max-width: 500px)');
  const classes = useStyles();

  const [showDialog, setShowDialog] = useState(false);

  function handleCloseDialog() {
    setShowDialog(false);
  }

  async function handleAddChat(): Promise<void> {
    setShowDialog(true);
  }

  return (
    <Drawer variant="permanent" className={classes.drawer} style={{ width: matches ? '56px' : '240px' }}>
      <Toolbar />
      <div className={classes.drawerListContainer} style={{ width: matches ? '56px' : '200px' }}>
        <List>
          <ListItem button onClick={handleAddChat}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText>Add chat</ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText>My profile</ListItemText>
          </ListItem>
        </List>
      </div>
      {showDialog ? <AddChatDialog handleCloseDialog={handleCloseDialog} /> : ''}
    </Drawer>
  );
};
export default SideDrawer;
