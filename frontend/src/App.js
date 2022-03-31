import { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import './app.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import { instance as axios } from './axios';

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/v1/messages/sync');
      setMessages(data);
    };

    getData();
  }, []);

  useEffect(() => {
    const pusher = new Pusher('d68bfa586f5d1cc4b6b9', {
      cluster: 'ap2',
    });

    var channel = pusher.subscribe('messages');
    channel.bind('inserted', function (newMessage) {
      setMessages([...messages, newMessage]);

      return () => {
        channel.unbind_all();
        channel.unsubscribe();
      };
    });
  }, [messages]);

  return (
    <div className="app">
      <div className="app_body">
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
