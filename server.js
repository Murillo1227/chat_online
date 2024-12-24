const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  maxHttpBufferSize: 50 * 1024 * 1024, // Configuración para 50 MB
});

// Middleware para servir archivos estáticos
app.use(express.static(__dirname + '/public'));

// Manejo de conexiones de socket
io.on('connection', (socket) => {
  console.log('Un usuario se conectó');

  // Escuchar mensajes
  socket.on('mensaje', (data) => {
    console.log('Mensaje recibido:', data);
    // Reenviar el mensaje a todos los clientes
    io.emit('mensaje', data);
  });

  // Desconexión de un usuario
  socket.on('disconnect', () => {
    console.log('Un usuario se desconectó');
  });
});

// Servidor escuchando en el puerto 3000
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});