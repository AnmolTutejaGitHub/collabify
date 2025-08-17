// ref : https://www.npmjs.com/package/@lamkoti/y-mongodb-provider

require('dotenv').config();
const http = require('http');
const WebSocket = require('ws');
const Y = require('yjs');
const { MongodbPersistence } = require('y-mongodb-provider');
const yUtils = require('y-websocket/bin/utils');
const config = require('./config/config');

const server = http.createServer();

const PORT = congig.PORT;

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