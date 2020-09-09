const express = require('express');
const path = require('path');
const { Socket } = require('dgram');
require('dotenv').config();

// App de Express
const app = express();


//Socket.io
// Node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket.js')


//Path public
const publicPath = path.resolve( __dirname, 'public')
app.use( express.static(publicPath))


server.listen(process.env.PORT, (err) =>{
    if(err) throw new Error(err);

    console.log('Servidor corriendo en puerto ', 3000);
})