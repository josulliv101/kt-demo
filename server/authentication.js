import jwt from 'express-jwt';

var {AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, AUTH0_DOMAIN} = process.env;
/*
var app = express();

// TODO: create auth middleware module
var authPublic = jwt( getAuthConfig({}) ),
	authSecured = jwt( getAuthConfig({ credentials: true }) );
*/
function getAuthConfig({ credentials = false }) {
  return {
    secret: new Buffer(AUTH0_CLIENT_SECRET, 'base64'),
    audience: AUTH0_CLIENT_ID,
    credentialsRequired: credentials,
    getToken
  }
}

function getToken(req) {
  console.log("fromHeaderOrCookie", req.cookies);
  if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  } else if(req.cookies && req.cookies.kindturtleToken) {
    return req.cookies.kindturtleToken;
  }
  return null;
}

export default {
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET,
  middleware: {
    secure: jwt( getAuthConfig({ credentials: true }) ),
    public: jwt( getAuthConfig({}) )
  },
  handleNotAuthenticatedError: function (err, req, res, next) {
    console.log('ERROR!!!!!!');
    if (err.name === 'UnauthorizedError') {
      res.redirect(`https://${AUTH0_DOMAIN}/login?client=${AUTH0_CLIENT_ID}`);
    }
  }
}