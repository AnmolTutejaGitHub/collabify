require('dotenv').config();
const http = require('http');
const socketio = require('socket.io');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const express = require('express');
const cors = require('cors');
const app = express();
const config = require('../config/config');

app.use(cors({
    origin: `${config.FRONTEND_URL}`,
    credentials: true
}));

app.use(express.json());
const server = http.createServer(app);
const PORT = config.PORT;


server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})