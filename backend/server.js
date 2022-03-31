import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import Pusher from 'pusher';
import { Message } from './dbMessages.js';

config();
const app = express();

const port = process.env.PORT;

const pusher = new Pusher({
  appId: '1370185',
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: 'ap2',
  useTLS: true,
});

app.use(express.json());
app.use(cors({ methods: '*', origin: '*' }));

mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;

db.once('open', () => {
  console.log('DB');
  const messages = db.collection('messages');
  const changeStream = messages.watch();

  changeStream.on('change', (change) => {
    if (change.operationType === 'insert') {
      const messageDetails = change.fullDocument;
      pusher.trigger('messages', 'inserted', {
        name: messageDetails.name,
        message: messageDetails.message,
      });
    } else {
      console.log('Error');
    }
  });
});

app.post('/api/v1/messages/new', async (req, res) => {
  const message = new Message(req.body);
  res.json(await message.save());
});

app.get('/api/v1/messages/sync', async (req, res) => {
  res.json(await Message.find());
});

app.listen(port);
