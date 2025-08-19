const express = require('express');
const router = express.Router();
const config = require("../config/config");
const Auth = require("../middleware/Auth");
const { v4: uuidv4 } = require("uuid");
const axios = require('axios');
const {Judge0Limiter} = require("../middleware/RateLimiters");

const languageMap = {
    javascript: 63,
    python: 71,
    java: 62,
    c : 50,
    cpp: 54,
    csharp: 51,
    go: 60,
    ruby: 72,
    php: 68,
}

router.get("/create",Auth,(req,res)=>{
    try{
        const uuid = uuidv4(); 
        res.status(200).send(`${config.FRONTEND_URL}/collab/${uuid}`);
    }catch(err){
        res.status(500).send({error : err});
    }
})

// https://rapidapi.com/judge0-official/api/judge0-ce
router.post("/run-code",Auth,Judge0Limiter,async(req,res)=>{
    try{
        const {language,source_code,stdin} = req.body;
        if (!language || !source_code){
            return res.status(400).send({ error: "language or source code missing" });
        }
        const judge0Response = await axios.post(
            "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
            { 
              language_id : languageMap[language],
              source_code,
              stdin : stdin || ""
            },
            {
              headers: {
                "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
                "X-RapidAPI-Key":config.JUDGE0_API_KEY,
              },
            }
          )
      
          res.status(200).send(judge0Response.data);
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }
})

module.exports = router;