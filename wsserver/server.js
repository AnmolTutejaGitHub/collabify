// ref : https://www.npmjs.com/package/@lamkoti/y-mongodb-provider

require('dotenv').config();
const http = require('http');
const WebSocket = require('ws');
const Y = require('yjs');
const { MongodbPersistence } = require('y-mongodb-provider');
const yUtils = require('y-websocket/bin/utils');
const config = require('./config/config');

// const server = http.createServer();
const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'GET' && req.url === '/check-socket-server') {
      res.writeHead(200,{ 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'up' }));
    } else {
      res.writeHead(404,{ 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Not Found' }));
    }
})

const PORT = config.PORT;

const wss = new WebSocket.Server({ server });

const mdb = new MongodbPersistence(`${config.MONGODB_URL}/collabify`, {
  collectionName: 'yjs-documents',
  flushSize: 100,
  multipleCollections: true,
});

yUtils.setPersistence({
  bindState: async (docName,ydoc) => {
    const persistedYdoc = await mdb.getYDoc(docName);
    const newUpdates = Y.encodeStateAsUpdate(ydoc);
    await mdb.storeUpdate(docName,newUpdates);
    Y.applyUpdate(ydoc,Y.encodeStateAsUpdate(persistedYdoc));
    
    ydoc.on('update', async update => {
      await mdb.storeUpdate(docName,update);
    });
  },
  writeState: async (docName,ydoc) => {
    await mdb.flushDocument(docName);
  }
});

wss.on('connection',yUtils.setupWSConnection);

server.listen(PORT,'0.0.0.0',() => {
  //console.log('webSocket server running on ws://localhost:1234');
  console.log(`webSocket server running on ${PORT}`);
})