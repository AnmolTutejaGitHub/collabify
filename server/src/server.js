require('dotenv').config();
require('../database/mongoose');
const http = require('http');
const socketio = require('socket.io');
const express = require('express');
const cors = require('cors');
const app = express();
const config = require('../config/config');
const userRoutes = require('../routes/UserRoutes');

app.use(cors({
    origin: `${config.FRONTEND_URL}`,
    credentials: true
}));

app.use(express.json());
const server = http.createServer(app);
const PORT = config.PORT;

app.use("/api/user",userRoutes);


server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})