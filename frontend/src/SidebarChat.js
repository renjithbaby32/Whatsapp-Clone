import { Avatar } from '@mui/material';
import React from 'react';
import './SidebarChat.css';

const SidebarChat = () => {
  return (
    <div className="sidebarChat">
      <Avatar></Avatar>
      <div className="sidebarChat_info">
        <h4>Name</h4>
        <p>Last message</p>
      </div>
    </div>
  );
};

export default SidebarChat;
