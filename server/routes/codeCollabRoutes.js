const express = require('express');
const router = express.Router();
const config = require("../config/config");
const Auth = require("../middleware/Auth");
const { v4: uuidv4 } = require("uuid");

router.get("/create",Auth,(req,res)=>{
    try{
        const uuid = uuidv4(); 
        res.status(200).send(`${config.FRONTEND_URL}/collab/${uuid}`);
    }catch(err){
        res.status(500).send({error : err});
    }
})

module.exports = router;