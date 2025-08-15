const config = {
    PORT : process.env.PORT || 8080,
    FRONTEND_URL : `http://localhost:5173`,
    MONGODB_URL : process.env.MONGODB_URL,
    NODEMAIL_APP_PASSWORD : process.env.NODEMAIL_APP_PASSWORD,
    JWT_TOKEN_SECRET : process.env.JWT_TOKEN_SECRET,
    JWT_TOKEN_SIGNUP_MAIL_SECRET : process.env.JWT_TOKEN_SIGNUP_MAIL_SECRET,
    JWT_RESET_PASSWORD_SECRET : process.env.JWT_RESET_PASSWORD_SECRET,
}

module.exports  = config;