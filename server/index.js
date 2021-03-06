import express from 'express';
import graphQL from './graphql'; // GraphQL Server
import mongoose from 'mongoose';
import path from 'path';
import compress from 'compression';
import auth from './authentication';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import renderOnServer from './renderOnServer';
import subscribeOnServer from './subscribeOnServer';

var {PORT, NODE_ENV, PWD, MONGOLAB_URI} = process.env;

var router = express();

router.use(compress());

router.use(express.static(path.join(PWD, 'public')));
router.use(cookieParser());
router.use(bodyParser.json());
 
router.use('/auth/callback', auth.handleAuthSuccess.bind(auth));
router.use('/logout', auth.handleLogout);
router.use('/graphql', graphQL);

// Throws error if no valid jwt
router.use('/private', auth.middleware.private);
router.use('/campaign/create', auth.middleware.private);
router.use('/api/subscribe', auth.middleware.private);

// Adds user to req if valid jwt
router.use('/*', auth.middleware.public.unless({path:['/private', '/api/subscribe', '/campaign/create']}));

router.use(auth.handleNotAuthenticatedError); // user not authenticated, send to login page


router.post('/api/subscribe', (req, res, next) => {
	subscribeOnServer(req, res, next);
}); 

//router.get("/", (req, res) => res.json({ hello: 'world' }));
router.get("/private", (req, res) => res.json({ hello: 'sssshhhhhhh' }));

router.get('/*', (req, res, next) => {
	renderOnServer(req, res, next);
}); 

//router.use('/*', app);

var server = router.listen(PORT, () => {
  console.log('Service started on port :' + PORT);
  console.log('Connecting to db :' + MONGOLAB_URI);
  if (MONGOLAB_URI) mongoose.connect(MONGOLAB_URI);
});
