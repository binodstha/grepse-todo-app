const { auth } = require("express-oauth2-jwt-bearer");
const dotenv = require("dotenv");

dotenv.config();
const authConfig = {
  domain: process.env.AUTH0_DOMAIN,
  audience: process.env.AUTH0_AUDIENCE
};

const jwtCheck = auth({
  audience: authConfig.audience,
  issuerBaseURL: 'https://dev-69uztrfh.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

module.exports = {
  jwtCheck,
};