import jwt from 'express-jwt';
import jwt2 from 'jsonwebtoken';
import url from 'url';
import request from 'superagent';
import jwtDecode from 'jwt-decode';
import auth0 from 'auth0';

var {AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, AUTH0_DOMAIN, AUTH0_REDIRECT, AUTH0_API_JWT, COOKIE_NAME, GRAPHQL_URL} = process.env;

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

  isNewUser: function(user = {}) {
    return user.user_metadata && user.user_metadata.isNewUser;
  },

  handleNewUser: function(user_id) {

    return new Promise((resolve, reject) => {
      
      console.log('handleNewUser', user_id);

      managementAuth0.updateUserMetadata({id: user_id}, { created: true }, function (err, user) {

        if (err) {
          console.log('updateUserOnAuth0 error', err, user_id);
          return reject({bar: 'baz'});
        }

        // Updated user.
        console.log('updateUserOnAuth0 success', user_id);

        resolve({success: true, user_id });

      });

    });
  },
  
  // TODO: make auth0 call to logout as well?
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
          `&scope=openid user_id name family_name given_name picture user_metadata`
      ].join(''));
    }
  },

  addNewUserToDB: function(payload) {

    var {user_id, family_name, given_name, picture} = payload;

    console.log('auth.addNewUserToDB', user_id);

    request
     .post(`${GRAPHQL_URL}?query=mutation{createNewUser(input:{user_id:"${user_id}",email:"",fname:"${given_name}",lname: "${family_name}", clientMutationId: "${user_id}" }){success}}`)
     .type('json')
     .end((err, resp) => {
       if (err || !resp.ok) {
         console.log('mutation: err', err);
       } else {
         console.log('mutation: user added', resp.body);
       }
     });
    
    // TODO: url encode all?
    request
     .post(`${GRAPHQL_URL}?query=mutation{createNewProfile(input:{owner_id:"${user_id}",profile_id:"profile-${user_id}",fname:"${given_name}",lname: "${family_name}", picture: "${encodeURIComponent(picture)}", clientMutationId: "profile-${user_id}" }){success}}`)
     .type('json')
     .end((err, resp) => {
       if (err || !resp.ok) {
         console.log('mutation: err', err);
       } else {
         console.log('mutation: profile added', resp.body);
       }
     });
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
     .end((err, resp) => {
       if (err || !resp.ok) {
         //console.log('Oh no! error', err);
       } else {
         let attrs = jwtDecode(resp.body.id_token);
         console.info('yay got ', attrs);
         
         if (attrs.user_metadata.created) {
           res.cookie(COOKIE_NAME, resp.body.id_token, { path: '/', httpOnly: true }); // , httpOnly: true
           res.redirect(302, '/#authenticated_user_already_created');   
           return;       
         }
         this.handleNewUser(attrs.user_id)
             .then( () => {

               this.addNewUserToDB(attrs);

               attrs.user_metadata.created = true;
              
               var tk = jwt2.sign(attrs, new Buffer(AUTH0_CLIENT_SECRET, 'base64'), { algorithm: 'HS256'});
               console.log('new token ##', tk);

               res.cookie(COOKIE_NAME, tk, { path: '/', httpOnly: true }); // , httpOnly: true

               // Redirect to a url that creates a new user. It will check for existance first.
               res.redirect(302, '/#authenticated_user_created_metadata_updated');

             });

       }
     });
  },

  getToken
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

  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;

  //console.log("fromHeaderOrCookie", req.cookies);
  if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  } else if(req.cookies && req.cookies[COOKIE_NAME]) {
    return req.cookies[COOKIE_NAME];
  } else if(query.token && query.token != '') {
    return query.token;
  }
  return null;
}