import jwt from 'express-jwt';
import url from 'url';
import request from 'superagent';
//import jwtDecode from 'jwt-decode';
import auth0 from 'auth0';
//import CreateUserMutation from './mutations/CreateUserMutation.js';
//import AuthUser from '../app/utils/AuthUser';

var {AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, AUTH0_DOMAIN, AUTH0_REDIRECT, AUTH0_API_JWT, COOKIE_NAME} = process.env;

// Make API calls to client requires global API client id
var managementAuth0 = new auth0.ManagementClient({
  token: AUTH0_API_JWT,
  domain: AUTH0_DOMAIN
});

export default {

  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET,
  middleware: {
    private: jwt( config({ credentials: true }) ),
    public: jwt( config({}) )
  },

  handleLogout: function(req, res) {
    res.clearCookie(COOKIE_NAME);
    res.redirect('/#no_more_cookie');
  },

  handleNotAuthenticatedError: function (err, req, res, next) {
    //console.log('ERROR!!!!!!');
    if (err.name === 'UnauthorizedError') {
      //res.redirect(`https://${AUTH0_DOMAIN}/authorize/?client_id=${AUTH0_CLIENT_ID}&response_type=code&redirect_uri=${AUTH0_REDIRECT}&state=OPAQUE_VALUE&connection=facebook`);
      res.redirect([
        `https://${AUTH0_DOMAIN}/authorize/?`,
          `response_type=code`,
          `&client_id=${AUTH0_CLIENT_ID}`,
          `&redirect_uri=${AUTH0_REDIRECT}`,
          `&state=VALUE_THAT_SURVIVES_REDIRECTS`,
          `&scope=openid name picture user_metadata`
      ].join(''));
    }
  },

  handleAuthSuccess: function(req, res) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    
    //console.log('auth cb query', query);

    request
     .post(`https://${AUTH0_DOMAIN}/oauth/token`)
     .type('form')
     .send({ 
        "client_id": AUTH0_CLIENT_ID, 
        "redirect_uri": AUTH0_REDIRECT,
        "client_secret": AUTH0_CLIENT_SECRET,
        "grant_type": "authorization_code",
        "code": query.code
     })
     .end(function(err, resp){
       if (err || !resp.ok) {
         //console.log('Oh no! error', err);
       } else {
         //let attrs = jwtDecode(resp.body.id_token);
         //console.info('yay got ', resp.body.id_token);
         //AuthUser.setUser(attrs);
         //AuthUser.setToken(resp.body.id_token);
         //token.set(resp.body.id_token);
         res.cookie(COOKIE_NAME, resp.body.id_token, { path: '/', httpOnly: true }); // , httpOnly: true
         //token.setAuthUser(req.user);
         //res.send('yo', resp);
         res.redirect(302, '/#authenticated');
       }
     });
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
  //console.log("fromHeaderOrCookie", req.cookies);
  if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  } else if(req.cookies && req.cookies[COOKIE_NAME]) {
    return req.cookies[COOKIE_NAME];
  }
  return null;
}