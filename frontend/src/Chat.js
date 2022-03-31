import { Avatar, IconButton } from '@mui/material';
import React, { useState } from 'react';
import './chat.css';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { InsertEmoticon } from '@mui/icons-material';
import MicOutlinedIcon from '@mui/icons-material/MicOutlined';
import { instance as axios } from './axios';

const Chat = ({ messages }) => {
  const [message, setMessage] = useState();

  const sendMessage = async (e) => {
    e.preventDefault();
    await axios.post('/api/v1/messages/new', {
      name: 'Renjith ',
      message: message,
      timestamp: 'now',
    });
    setMessage('');
  };

  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar></Avatar>
        <div className="chat_header_info">
          <h3>Room name</h3>
          <p>Last seen at</p>
        </div>
        <IconButton>
          <AttachFileOutlinedIcon />
        </IconButton>
        <IconButton>
          <SearchOutlinedIcon />
        </IconButton>
        <IconButton>
          <MoreVertOutlinedIcon />
        </IconButton>
      </div>

      <div className="chat_body">
        {messages.map((message) => {
          return (
            <p className="chat_body_message">
              <span className="chat_body_message_name">{message.name}</span>
              {message.message}
              <span className="chat_body_message_time">
                {message.timestamp}
              </span>
            </p>
          );
        })}
      </div>

      <div className="chat_footer">
        <InsertEmoticon />
        <form>
          <input
            type="text"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            value={message}
            placeholder="Type a message"
          />
          <button onClick={sendMessage} type="submit">
            Send
          </button>
        </form>
        <MicOutlinedIcon />
      </div>
    </div>
  );
};

export default Chat;
