import {} from 'dotenv/config';
import express from 'express';
import graphQL from './graphql'; // GraphQL Server
import mongoose from 'mongoose';
import path from 'path';
import auth from './authentication';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
//import app from '../app/server';
import renderOnServer from '../app/renderOnServer'

var {PORT, NODE_ENV, PWD, MONGOLAB_URI} = process.env;

var router = express();

router.use(express.static(path.join(PWD, 'public')));
router.use(cookieParser());
router.use(bodyParser.json());

router.use('/auth/callback', auth.handleAuthSuccess);
router.use('/logout', auth.handleLogout);
router.use('/graphql', graphQL);

// Throws error if no valid jwt
router.use('/private', auth.middleware.private);

// Adds user to req if valid jwt
router.use('/*', auth.middleware.public.unless({path:'/private'}));

router.use(auth.handleNotAuthenticatedError); // user not authenticated, send to login page

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
