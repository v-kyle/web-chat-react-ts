import React from 'react';
import {
  Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { createChat } from '../api/chat';

const SideDrawer: React.FC = () => {
  async function handleAddChat(): Promise<void> {
    const name = 'testChatName';
    await createChat(name);
  }

  return (
    <Drawer variant="permanent" style={{ width: '240px', flexShrink: 0 }}>
      <Toolbar />
      <div style={{ overflow: 'auto' }}>
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
    </Drawer>
  );
};
export default SideDrawer;
