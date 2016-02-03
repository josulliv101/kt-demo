import express from 'express';
import graphQL from './graphql'; // GraphQL Server
import mongoose from 'mongoose';
import path from 'path';
import auth from './authentication';

var {PORT, NODE_ENV, PWD, MONGOLAB_URI} = process.env;

var router = express();

router.use(express.static(path.join(PWD, 'public')));
router.use('/auth/callback', (req, res) => res.json({ token: '123456...' }));
router.use('/graphql', graphQL);
router.use('/*', auth.middleware.private);
router.use(auth.handleNotAuthenticatedError); // user not authenticated
router.get("/", (req, res) => res.json({ hello: 'world' }));
 
var server = router.listen(PORT, () => {
  console.log('Service started on port :' + PORT);
  console.log('Connecting to db :' + MONGOLAB_URI);
  if (MONGOLAB_URI) mongoose.connect(MONGOLAB_URI);
});
