const { setupWSConnection } = require('y-websocket/bin/utils');
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 1234 });

wss.on('connection', setupWSConnection);

console.log('WebSocket server running on ws://localhost:1234');