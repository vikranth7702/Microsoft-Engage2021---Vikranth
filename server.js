//Creating a  Signalling server using socket.io, express and peer

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
  debug: true
});
const { v4: uuidV4 } = require('uuid');

app.use('/peerjs', peerServer);

// Calling our html page to open
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room })
});

// Creating a unique room-id
app.get('/', (req, res) => {
  res.redirect(`/${uuidV4()}`)
});

const users = {};
// Handling connections
io.on('connection', socket => {
  // Storing the name of user
  socket.on('new-user', userName =>{
    users[socket.id] = userName;
  });

  // Connecting the user to other users
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId)
    socket.to(roomId).emit('user-connected', userId);
    io.to(roomId).emit('user-joined', users[socket.id])

    // sending the message and time of message from one user to other
    socket.on('message', (message) => {
      io.to(roomId).emit('createMessage', { message: message, userName: users[socket.id]})
      }); 
    
    // Disconnectiong the user
    socket.on('disconnect', () => {
      socket.to(roomId).emit('user-disconnected', userId)
      socket.to(roomId).emit('user-left', users[socket.id])
      });
    });
});

server.listen(process.env.PORT||3000);