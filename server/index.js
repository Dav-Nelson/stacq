const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: process.env.CLIENT_URL || "http://localhost:5173" }
});

app.use(cors());
app.use(express.json());

// Basic routes
app.get('/', (req, res) => res.json({ message: 'StacQ API' }));

// Socket.io integration
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('join-queue', (queueId) => {
    socket.join(queueId);
  });

  socket.on('disconnect', () => console.log('Client disconnected'));
});

// Expose io for controllers to use
app.set('io', io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
