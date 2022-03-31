import React from 'react';
import './sidebar.css';
import SidebarChat from './SidebarChat';
import ChatIcon from '@mui/icons-material/Chat';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { IconButton, Avatar } from '@mui/material';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <div className="sidebar_header_left">
          <Avatar></Avatar>
        </div>
        <div className="sidebar_header_right">
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="sidebar_search">
        <div className="search_container">
          <SearchOutlinedIcon />
          <input
            className="searchbox"
            type={'text'}
            placeholder={'Search or start a new chat'}
          ></input>
        </div>
      </div>

      <div className="sidebar_chats">
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
      </div>
    </div>
  );
};

export default Sidebar;
