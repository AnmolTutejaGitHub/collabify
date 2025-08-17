require('dotenv').config();
require('../database/mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const config = require('../config/config');
const userRoutes = require('../routes/UserRoutes');
const codeCollabRoutes = require('../routes/codeCollabRoutes');

app.use(cors({
    origin: `${config.FRONTEND_URL}`,
    credentials: true
}));

app.use(express.json());
const PORT = config.PORT;

app.use("/api/user",userRoutes);
app.use("/api/collab",codeCollabRoutes);


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})