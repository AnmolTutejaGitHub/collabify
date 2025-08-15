const mongoose = require('mongoose');
const config = require("../config/config");

mongoose.connect('mongodb://127.0.0.1:27018/collabify');

//mongoose.connect(`${config.MONGODB_URL}/collabify`);