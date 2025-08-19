// reference : https://medium.com/@ignatovich.dm/creating-a-simple-api-rate-limiter-with-node-a834d03bad7a
const rateLimit = require('express-rate-limit');

const LoginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 5,
  message: "Too many login attempts, please try again after a minute"
})

const SignupLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, 
    max: 5,
    message: "Too many signup attempts, please try again after a minute"
})

const Judge0Limiter = rateLimit({
    windowMs: 1 * 60 * 1000, 
    max: 1, 
    message: "Too many Judge0 requests. Dwag I have bills to pay. Limit = 1 request per min per window per IP"
})
  

module.exports = {LoginLimiter,SignupLimiter,Judge0Limiter};