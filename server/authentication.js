import jwt from 'express-jwt';

var {AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, AUTH0_DOMAIN, AUTH0_REDIRECT, COOKIE_NAME} = process.env;

export default {
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET,
  middleware: {
    private: jwt( config({ credentials: true }) ),
    public: jwt( config({}) )
  },
  handleNotAuthenticatedError: function (err, req, res, next) {
    console.log('ERROR!!!!!!');
    if (err.name === 'UnauthorizedError') {
      res.redirect(`https://${AUTH0_DOMAIN}/authorize/?client_id=${AUTH0_CLIENT_ID}&response_type=code&redirect_uri=${AUTH0_REDIRECT}&state=OPAQUE_VALUE&connection=facebook`);
    }
  }
}

function config({ credentials = false }) {
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
  } else if(req.cookies && req.cookies[COOKIE_NAME]) {
    return req.cookies[COOKIE_NAME];
  }
  return null;
}