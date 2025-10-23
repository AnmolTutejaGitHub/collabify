const mongoose = require('mongoose');


const HistorySchema = new mongoose.Schema({
   user_id : {
        type : String,
    },
    collab_id : {
        type : String,
    },
    AccessedAt : {
        type : Date,
        default : Date.now,
    }
})


const History = mongoose.model('History',HistorySchema);
module.exports = History;